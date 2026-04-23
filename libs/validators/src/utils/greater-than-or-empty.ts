import { greaterThan } from './validators'

export const greaterThanOrEmpty =
  (compareValue: number) => (value: string | number | undefined | null) =>
    value === '' || value === undefined || value === null
      ? undefined
      : greaterThan(compareValue)(String(value))
