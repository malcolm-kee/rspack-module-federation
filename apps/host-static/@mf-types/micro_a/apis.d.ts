
    export type RemoteKeys = 'micro_a/block';
    type PackageType<T> = T extends 'micro_a/block' ? typeof import('micro_a/block') :any;