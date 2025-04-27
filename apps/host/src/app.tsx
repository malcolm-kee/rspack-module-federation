import * as React from 'react';
import { loadRemotes } from './lib/load-remotes';
import type { Block } from '@rspack-mf/cli';
export const App = () => {
  const [block, setBlock] = React.useState<Block | null>(null);

  React.useEffect(() => {
    loadRemotes().then((result) => {
      setBlock(result);
    });
  }, []);

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
    </div>
  );
};
