export const booleanToGql = (value?: unknown) =>
  value === 'true' || value === 'yes'
    ? true
    : value === 'false' || value === 'no'
    ? false
    : undefined
