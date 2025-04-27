import fs from 'node:fs';
import path from 'node:path';

export const findClosest = (fileName: string, startPath: string): string => {
  let currentPath = startPath;
  let previousPath = '';

  while (currentPath !== previousPath) {
    const packageJsonPath = path.join(currentPath, fileName);
    if (fs.existsSync(packageJsonPath)) {
      return currentPath;
    }
    previousPath = currentPath;
    currentPath = path.dirname(currentPath);
  }

  return startPath;
};
