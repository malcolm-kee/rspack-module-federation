import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import type { Configuration, DevServer, Mode, SharedObject, Plugin } from '@rspack/core';
import { rspack } from '@rspack/core';
import fs from 'node:fs';
import path from 'node:path';

import { fsToRequirePath } from './lib/fs-to-require-path';
import { type AppInfo } from './lib/get-app-info';
import { type PathsInfo } from './paths';

export const createRspackConfig = ({
  paths,
  mode,
  appInfo,
  devServerOverrides = {},
  appType,
  moduleFederationVersion,
}: {
  paths: PathsInfo;
  mode: Mode;
  appInfo: AppInfo;
  appType: AppType;
  moduleFederationVersion: ModuleFederationVersion;
  devServerOverrides?: DevServer;
}): Configuration => {
  return {
    mode,
    entry: { main: paths.appEntry },
    context: paths.appRoot,
    output: {
      uniqueName: `app-${appInfo.appName.asVariable}`,
      publicPath: appType === 'host' ? '/' : 'auto',
      path: paths.appOutputDir,
      filename: mode === 'development' ? '[name].js' : '[name].[chunkhash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
              },
            },
          },
        },
      ],
    },
    devtool: mode === 'development' ? 'cheap-module-source-map' : 'source-map',
    resolve: {
      extensions: paths.supportedExtensions.slice(0),
    },
    plugins: [
      new rspack.HtmlRspackPlugin({
        title: appInfo.appName.asHuman,
        templateContent: /* html */ `<!DOCTYPE html><html>
          <head><title><%= htmlRspackPlugin.options.title %></title></head>
          <body><div id="root"></div></body>
        </html>`,
        excludeChunks: [appInfo.appName.asVariable],
      }),
      getModuleFederationPlugin({
        version: moduleFederationVersion,
        appInfo,
        appType,
        paths,
      }),
    ],
    cache: false,
    devServer:
      mode === 'development'
        ? {
            open: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            ...devServerOverrides,
          }
        : undefined,
  };
};

export type ModuleFederationVersion = 'v1' | 'v1.5' | 'v2';

export type AppType = 'host' | 'remote';

const getModuleFederationPlugin = ({
  version,
  paths,
  appInfo,
  appType,
}: {
  version: ModuleFederationVersion;
  paths: PathsInfo;
  appInfo: AppInfo;
  appType: AppType;
}): Plugin => {
  const federationConfig = {
    name: appInfo.appName.asVariable,
    filename: 'remoteEntry.js',
    exposes: (fs.existsSync(paths.appBlock)
      ? {
          './block': './' + fsToRequirePath(path.relative(paths.appRoot, paths.appBlock)),
        }
      : {}) as Record<string, string>,
    shared: {
      ...(appInfo.dependencies['@rspack-mf/utils']
        ? makeSingletonConfig(
            { name: '@rspack-mf/utils', version: appInfo.dependencies['@rspack-mf/utils'] },
            appType,
          )
        : {}),
      ...(appInfo.dependencies.react
        ? makeSingletonConfig({ name: 'react', version: appInfo.dependencies.react }, appType)
        : {}),
      ...(appInfo.dependencies['react-dom']
        ? makeSingletonConfig(
            { name: 'react-dom', version: appInfo.dependencies['react-dom'] },
            appType,
          )
        : {}),
    },
  };

  console.log('Module federation', version, federationConfig);

  switch (version) {
    case 'v1':
      return new rspack.container.ModuleFederationPluginV1(federationConfig);

    case 'v1.5':
      return new rspack.container.ModuleFederationPlugin(federationConfig);

    case 'v2':
      return new ModuleFederationPlugin(federationConfig);

    default:
      version satisfies never;
      throw new Error(`Unsupported module federation version: ${version}`);
  }
};

const makeSingletonConfig = (
  pkg: {
    name: string;
    version: string;
  },
  appType: AppType,
): SharedObject => {
  return {
    [pkg.name]:
      appType === 'host'
        ? {
            singleton: true,
            requiredVersion: normalizeVersion(pkg.version),
          }
        : {
            singleton: true,
            requiredVersion: '*',
            version: '0',
          },
  };
};

const normalizeVersion = (version: string) => (version.startsWith('workspace:') ? '*' : version);
