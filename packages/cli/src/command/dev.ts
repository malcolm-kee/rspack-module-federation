import { RspackDevServer } from '@rspack/dev-server';
import { rspack } from '@rspack/core';

import {
  createRspackConfig,
  type AppType,
  type ModuleFederationVersion,
} from '../create-rspack-config';
import { paths } from '../paths';
import { getAppInfo } from '../lib/get-app-info';

export const dev = (options: { port: number; type: AppType; mf: ModuleFederationVersion }) => {
  const appInfo = getAppInfo({ paths });

  const config = createRspackConfig({
    paths,
    mode: 'development',
    appInfo,
    appType: options.type,
    moduleFederationVersion: options.mf,
    devServerOverrides: {
      port: options.port,
    },
  });

  const compiler = rspack(config);

  const devServer = new RspackDevServer(config.devServer!, compiler);

  return devServer.start();
};
