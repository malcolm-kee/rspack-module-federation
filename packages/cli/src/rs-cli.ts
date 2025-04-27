import cac from 'cac';
import { build } from './command/build';
import { dev } from './command/dev';

const cli = cac('rs-cli');

cli
  .command('dev', 'Start development server')
  .option('--port [port]', 'Port number for the dev server', {
    default: 3000,
  })
  .option('--type [type]', 'App type, could be host or remote', {
    default: 'remote',
  })
  .option('--mf [version]', 'Module federation version, could be v1, v1.5, or v2', {
    default: 'v1',
  })
  .action(async (options) => {
    console.log('Starting development server...', options);
    await dev(options);
  });

cli
  .command('build', 'Build for production')
  .option('--type [type]', 'App type', {
    default: 'remote',
  })
  .option('--mf [version]', 'Module federation version', {
    default: 'v1',
  })
  .action(async (options) => {
    console.log('Building for production...');
    await build(options);

    console.log('Build completed successfully');
  });

cli.help();
cli.parse();
