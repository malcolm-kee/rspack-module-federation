import path from 'node:path';

export const fsToRequirePath = (fsPath: string): string =>
  fsPath.split(path.sep).join(path.posix.sep);
