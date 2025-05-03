import type { JSXElementConstructor } from 'react';

export interface Block {
  components: Array<JSXElementConstructor<{}>>;
}

export interface BlockConfig {
  remotes?: Array<{
    name: string;
    url: string;
  }>;
}
