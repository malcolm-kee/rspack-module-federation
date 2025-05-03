import type { Block } from '@rspack-mf/cli';
import * as React from 'react';
import { loadRemotes, loadRemotesV2 } from './lib/load-remotes';

export const App = () => {
  const [blocks, setBlocks] = React.useState<Array<Block> | null>(null);

  return (
    <div>
      <h1>Host App</h1>
      {blocks ? (
        <>
          {blocks.map((block, index) => (
            <React.Fragment key={index}>
              {block.components.map((Component, cIndex) => (
                <Component key={cIndex} />
              ))}
            </React.Fragment>
          ))}
        </>
      ) : null}
      <button
        onClick={() => {
          setBlocks(null);
          loadRemotes().then(setBlocks);
        }}
        type="button"
      >
        Load Remotes
      </button>
      <button
        onClick={() => {
          setBlocks(null);
          loadRemotesV2().then((block) => block && setBlocks(block));
        }}
        type="button"
      >
        Load Remotes V2
      </button>
    </div>
  );
};
