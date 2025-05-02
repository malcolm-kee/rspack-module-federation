import type { Block } from '@rspack-mf/cli';
import * as React from 'react';
import { loadRemotes, loadRemotesV2 } from './lib/load-remotes';

export const App = () => {
  const [block, setBlock] = React.useState<Block | null>(null);

  return (
    <div>
      <h1>Host App</h1>
      {block ? (
        <>
          {block.components.map((Component, index) => (
            <Component key={index} />
          ))}
        </>
      ) : null}
      <button
        onClick={() => {
          setBlock(null);
          loadRemotes().then(setBlock);
        }}
        type="button"
      >
        Load Remotes
      </button>
      <button
        onClick={() => {
          setBlock(null);
          loadRemotesV2().then((block) => block && setBlock(block));
        }}
        type="button"
      >
        Load Remotes V2
      </button>
    </div>
  );
};
