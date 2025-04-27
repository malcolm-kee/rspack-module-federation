import type { Block } from '@rspack-mf/cli';
import { Button } from './components/button';
import { OnlineCheck } from './components/online-check';

export default {
  components: [Button, OnlineCheck],
} satisfies Block;
