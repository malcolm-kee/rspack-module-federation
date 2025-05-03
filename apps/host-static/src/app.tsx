import MicroABlock from 'micro_a/block';
import MicroBBlock from 'micro_b/block';

export const App = () => {
  return (
    <div>
      <h1>Host Static App</h1>
      {MicroABlock.components.map((Component, index) => (
        <Component key={index} />
      ))}
      {MicroBBlock.components.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};
