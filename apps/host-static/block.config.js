/** @satisfies {import('@rspack-mf/cli').BlockConfig} */
const config = {
  remotes: [
    {
      name: 'micro_a',
      url: 'http://localhost:3398',
    },
  ],
};

module.exports = config;
