export const extractAppName = (packageName: string) => ({
  name: packageName,
  nameAsVariable: packageName.replace(/@|\//g, '').replace(/-/g, '_'),
});
