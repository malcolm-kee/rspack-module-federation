# rspack-module-federation

This is a repo to showcase module federation implementation with [Rspack](https://rspack.dev/).

## Project structure

This is a monorepo project using pnpm workspaces. The project is organized into two main directories:

### Apps (`/apps`)

- `host/`: The main application that serves as the container for other micro-frontends
- `host-static/`: Similar to `host/`, but the remotes are used with `import` instead of loaded using runtime API.
- `micro-a/` and `micro_b/`: micro-frontend application that can be loaded into the host application

### Packages (`/packages`)

- `cli/`: Command-line interface tools for the project
- `runtime/`: Runtime utilities and shared code for module federation
- `utils/`: Shared utility functions and helpers

## Available Scripts

- `pnpm build`: Build all packages and apps
- `pnpm build:app`: Build all apps
- `pnpm build:app:2`: Build all apps with module federation v2
- `pnpm dev`: Start development servers for all packages
- `pnpm dev:app`: Start development servers for all apps
- `pnpm dev:app:1.5`: Start development servers with module federation v1.5
- `pnpm dev:app:2`: Start development servers with module federation v2

## Module federation setup

The project demonstrates two approaches to module federation:

### 1. Webpack Internal Runtime API

This approach uses the internal webpack runtime APIs directly:

```typescript
// Example usage in host app
import { loadRemoteModule } from '@rspack-mf/runtime';

const result = await loadRemoteModule<{ default: Block }>({
  remoteEntryUrl: 'http://localhost:3398/remoteEntry.js',
  remoteName: 'micro_a',
  exposedModule: './block',
});
```

The runtime implementation (`@rspack-mf/runtime`) provides:

- `loadRemoteEntry`: Loads the remote entry script and initializes the remote container
- `loadRemoteModule`: Loads a specific module from a remote container
- Internal handling of webpack's sharing scope initialization

### 2. Enhanced Runtime API (V2)

A more streamlined API that handles initialization and module loading:

```typescript
// Example usage in host app
import { init, loadRemote } from '@rspack-mf/runtime';

// Initialize the host app and configure remotes
init({
  name: 'host',
  remotes: [
    {
      name: 'micro_a',
      entry: 'http://localhost:3398/remoteEntry.js',
    },
  ],
});

// Load a remote module
const result = await loadRemote<{ default: Block }>('micro_a/block');
```

### Remote Module Structure

Remote modules (micro-frontends) expose their components through a `Block` interface:

```ts
import type { Block } from '@rspack-mf/cli';

export default {
  components: [Button, OnlineCheck],
} satisfies Block;
```

The host application can then dynamically load and render these components.

### Rspack Configuration

The project uses a custom CLI [`@rspack-mf/cli`](./packages/cli/README.md) to generate Rspack configurations. The configuration includes:

- Unique application name for each micro-frontend
- Automatic exposure of the `block` module if it exists
- Singleton shared dependencies (React, React DOM, and utils)
- Development server with CORS headers for local development
- React Refresh support for hot module replacement
- Production build serving capabilities

The configuration supports three versions of module federation:

1. **v1**: Using `ModuleFederationPluginV1`
2. **v1.5**: Using `ModuleFederationPlugin`
3. **v2**: Using `@module-federation/enhanced/rspack`

## Development Features

- Hot Module Replacement (HMR) with React Refresh
- Development server with CORS support
- Production build serving with static file handling
- TypeScript support throughout the project
- Modern React features (automatic runtime, JSX transform)
