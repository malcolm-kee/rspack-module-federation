import fs from 'node:fs';
import { createServer } from 'node:http';
import handler from 'serve-handler';

import { paths } from '../paths';

export const serve = (options: { port: number }) => {
  if (!fs.existsSync(paths.appOutputDir)) {
    throw new Error(
      `Output directory ${paths.appOutputDir} does not exist. Run build command first.`,
    );
  }

  const server = createServer((req, res) =>
    handler(req, res, {
      public: paths.appOutputDir,
    }),
  );

  return new Promise<void>((fulfill) => {
    server.listen(options.port, () => {
      console.log(`Server is running on port ${options.port}`);
      fulfill();
    });
  });
};
