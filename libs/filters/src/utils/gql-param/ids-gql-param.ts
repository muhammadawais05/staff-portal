export const IdsGqlParam =
  () =>
  (values: unknown): string[] =>
    ((values as unknown[]) || [])?.map(value =>
      ((value as string | number) || '').toString()
    )
