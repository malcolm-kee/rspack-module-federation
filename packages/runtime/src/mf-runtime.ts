/// <reference lib="DOM" />

type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void | Promise<void>;
  get(module: string): Factory | Promise<Factory>;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

const moduleMap: Record<string, boolean | undefined> = {};
const remoteMap: Record<string, any> = {};

let isDefaultScopeInitialized = false;

async function lookupExposedModule<T>(remoteName: string, exposedModule: string): Promise<T> {
  const container = (window as any)[remoteName] as Container;
  const factory = await container.get(exposedModule);
  return factory() as T;
}

async function initRemote(remoteName: string) {
  const container = (window as any)[remoteName] as Container;

  if (remoteMap[remoteName]) {
    return container;
  }

  if (!isDefaultScopeInitialized) {
    await __webpack_init_sharing__('default');
    isDefaultScopeInitialized = true;
  }

  await container.init(__webpack_share_scopes__.default);

  remoteMap[remoteName] = container;

  return container;
}

export const loadRemoteEntry = (remoteEntryUrl: string, remoteName: string) =>
  new Promise<void>((fulfill, reject) => {
    if (moduleMap[remoteEntryUrl]) {
      return fulfill();
    }

    const $script = document.createElement('script');
    $script.src = remoteEntryUrl;
    $script.onerror = reject;

    $script.onload = () => {
      initRemote(remoteName).then(() => {
        moduleMap[remoteEntryUrl] = true;
        fulfill();
      });
    };

    document.head.appendChild($script);
  });

export async function loadRemoteModule<T>(options: {
  remoteEntryUrl?: string;
  remoteName: string;
  /** The module that is exposed by the remote, e.g. `'./block'` */
  exposedModule: string;
}): Promise<T> {
  if (options.remoteEntryUrl) {
    await loadRemoteEntry(options.remoteEntryUrl, options.remoteName);
  }
  return lookupExposedModule<T>(options.remoteName, options.exposedModule);
}
