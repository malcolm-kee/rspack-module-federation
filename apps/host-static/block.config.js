/** @satisfies {import('@rspack-mf/cli').BlockConfig} */
const config = {
  remotes: [
    {
      name: 'micro_a',
      url: 'http://localhost:3398',
    },
    {
      name: 'micro_b',
      url: 'http://localhost:3400',
    },
  ],
};

module.exports = config;
