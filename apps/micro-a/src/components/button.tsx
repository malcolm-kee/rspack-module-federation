import * as React from 'react';

export const Button = () => {
  const [count, increment] = React.useReducer((x: number) => x + 1, 0);

  return (
    <button onClick={increment} type="button">
      {count ? `${count} clicks` : 'Click me'}
    </button>
  );
};
