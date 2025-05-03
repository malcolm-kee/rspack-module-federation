import type { Block } from '@rspack-mf/cli';
import { init, loadRemote, loadRemoteModule } from '@rspack-mf/runtime';

export const loadRemotes = async () => {
  const allBlocks = await Promise.all([
    loadRemoteModule<{ default: Block }>({
      remoteEntryUrl: 'http://localhost:3398/remoteEntry.js',
      remoteName: 'micro_a',
      exposedModule: './block',
    }),
    loadRemoteModule<{ default: Block }>({
      remoteEntryUrl: 'http://localhost:3400/remoteEntry.js',
      remoteName: 'micro_b',
      exposedModule: './block',
    }),
  ]);

  return allBlocks.map((r) => r.default).filter((v) => v != null);
};

export const loadRemotesV2 = async () => {
  init({
    name: 'host',
    remotes: [
      {
        name: 'micro_a',
        entry: 'http://localhost:3398/remoteEntry.js',
      },
      {
        name: 'micro_b',
        entry: 'http://localhost:3400/remoteEntry.js',
      },
    ],
  });

  const result = await Promise.all([
    loadRemote<{ default: Block }>('micro_a/block'),
    loadRemote<{ default: Block }>('micro_b/block'),
  ]);

  return result.map((r) => r?.default).filter((v) => v != null);
};
