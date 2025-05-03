import { extractAppName } from '@rspack-mf/runtime';
import { sentenceCase } from 'change-case';
import fs from 'node:fs';

import type { PathsInfo } from '../paths';
import type { BlockConfig } from '../types';

export type AppInfo = ReturnType<typeof getAppInfo>;

export const getAppInfo = ({ paths }: { paths: PathsInfo }) => {
  const pkgJson = JSON.parse(fs.readFileSync(paths.appPackageJson, 'utf-8'));

  const blockConfig: BlockConfig | undefined = fs.existsSync(paths.appBlockConfig)
    ? require(paths.appBlockConfig)
    : undefined;

  const appName = pkgJson.name;

  const { name, nameAsVariable } = extractAppName(appName);

  return {
    appName: {
      raw: name,
      asVariable: nameAsVariable,
      asHuman: sentenceCase(appName),
    },
    dependencies: (pkgJson.dependencies ?? {}) as Record<string, string | undefined>,
    blockConfig,
  };
};
