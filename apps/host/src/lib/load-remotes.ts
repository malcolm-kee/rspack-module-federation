import type { Block } from '@rspack-mf/cli';
import { init, loadRemote, loadRemoteModule } from '@rspack-mf/runtime';

export const loadRemotes = async () => {
  const { default: result } = await loadRemoteModule<{ default: Block }>({
    remoteEntryUrl: 'http://localhost:3398/remoteEntry.js',
    remoteName: 'micro_a',
    exposedModule: './block',
  });

  return result;
};

export const loadRemotesV2 = async () => {
  init({
    name: 'host',
    remotes: [
      {
        name: 'micro_a',
        entry: 'http://localhost:3398/remoteEntry.js',
      },
    ],
  });

  const result = await loadRemote<{ default: Block }>('micro_a/block');

  return result?.default;
};
