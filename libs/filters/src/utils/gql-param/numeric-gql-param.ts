export const NumericGqlParam = () => (value: unknown) =>
  (value as string[]).map(val => parseInt(val))
