export const IdGqlParam = () => (value: unknown) =>
  ((value as string) || '').toString()
