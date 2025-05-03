
    export type RemoteKeys = 'micro_b/block';
    type PackageType<T> = T extends 'micro_b/block' ? typeof import('micro_b/block') :any;