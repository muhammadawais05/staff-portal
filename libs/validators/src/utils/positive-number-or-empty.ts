import { positiveNumber } from './validators'

export const positiveNumberOrEmpty = (
  value: string | number | undefined | null
) =>
  value === '' || value === undefined || value === null
    ? undefined
    : positiveNumber(value.toString())
