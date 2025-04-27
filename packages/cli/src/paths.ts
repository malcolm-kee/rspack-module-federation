import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import { findClosest } from './lib/find-closest';

const appRoot = findClosest('package.json', process.cwd());

const supportedExtensions = ['.ts', '.tsx', '.js', '.jsx'] as const;

const resolveModule = (pathWithoutExtension: string) => {
  const extension = supportedExtensions.find((ext) =>
    fs.existsSync(`${pathWithoutExtension}${ext}`),
  );

  return `${pathWithoutExtension}${extension || '.js'}`;
};

export const paths = {
  appRoot,
  appEntry: resolveModule(path.resolve(appRoot, 'src/index')),
  appOutputDir: path.resolve(appRoot, 'build'),
  appPackageJson: path.resolve(appRoot, 'package.json'),
  appBlock: resolveModule(path.resolve(appRoot, 'src/block')),
  supportedExtensions,
};

export type PathsInfo = typeof paths;
