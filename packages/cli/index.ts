import type { JSXElementConstructor } from 'react';

export interface Block {
  components: Array<JSXElementConstructor<{}>>;
}
