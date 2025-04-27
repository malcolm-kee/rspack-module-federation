import { rspack } from '@rspack/core';

import {
  createRspackConfig,
  type AppType,
  type ModuleFederationVersion,
} from '../create-rspack-config';
import { paths } from '../paths';
import { getAppInfo } from '../lib/get-app-info';

export const build = (options: { type: AppType; mf: ModuleFederationVersion }) => {
  const appInfo = getAppInfo({ paths });

  const config = createRspackConfig({
    paths,
    mode: 'development',
    appInfo,
    appType: options.type,
    moduleFederationVersion: options.mf,
  });

  const compiler = rspack(config);

  return new Promise<void>((fulfill, reject) => {
    compiler.run((err) => {
      if (err) {
        return reject(err);
      }

      fulfill();
    });
  });
};
