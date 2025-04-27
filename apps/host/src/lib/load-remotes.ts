import type { Block } from '@rspack-mf/cli';
import { loadRemoteModule } from '@rspack-mf/runtime';

export const loadRemotes = async () => {
  const { default: result } = await loadRemoteModule<{ default: Block }>({
    remoteEntryUrl: 'http://localhost:3398/remoteEntry.js',
    remoteName: 'micro_a',
    exposedModule: './block',
  });

  return result;
};
