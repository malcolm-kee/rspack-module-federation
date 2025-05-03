import MicroABlock from 'micro_a/block';

export const App = () => {
  return (
    <div>
      <h1>Host Static App</h1>
      {MicroABlock.components.map((Component, index) => (
        <Component key={index} />
      ))}
    </div>
  );
};
