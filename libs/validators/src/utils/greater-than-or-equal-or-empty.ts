import { greaterThanOrEqual } from './validators'

export const greaterThanOrEqualOrEmpty =
  (minValue: number) => (value: string | number | undefined | null) =>
    value === '' || value === undefined || value === null
      ? undefined
      : greaterThanOrEqual(minValue)(String(value))

export const zeroOrGreaterOrEmpty = greaterThanOrEqualOrEmpty(0)
