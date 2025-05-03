# @rspack-mf/cli

A command-line interface tool for managing Rspack Module Federation applications.

## Installation

```bash
npm install @rspack-mf/cli
```

## Usage

The CLI provides three main commands for managing your Module Federation applications:

### Development Server

Start a development server with hot module replacement:

```bash
rs-cli dev [options]
```

Options:

- `--port [port]`: Port number for the dev server (default: 3000)
- `--type [type]`: App type, either 'host' or 'remote' (default: 'remote')
- `--mf [version]`: Module Federation version, can be 'v1', 'v1.5', or 'v2' (default: 'v1')

### Production Build

Build your application for production:

```bash
rs-cli build [options]
```

Options:

- `--type [type]`: App type, either 'host' or 'remote' (default: 'remote')
- `--mf [version]`: Module Federation version, can be 'v1', 'v1.5', or 'v2' (default: 'v1')

### Production Server

Serve your production build:

```bash
rs-cli serve [options]
```

Options:

- `--port [port]`: Port number to serve the request (default: 3000)

## Example Usage

1. Start a development server for a remote application:

```bash
rs-cli dev --type remote --port 3001
```

2. Build a host application for production:

```bash
rs-cli build --type host
```

3. Serve a production build:

```bash
rs-cli serve --port 3000
```

## Features

- Supports both host and remote applications
- Multiple Module Federation versions (v1, v1.5, v2)
- Development server with hot module replacement
- Production build optimization
- Simple production server for testing builds
