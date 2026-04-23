import { FieldValidator } from '@toptal/picasso-forms'

const MIN_VALUE = 0
const MAX_VALUE = 168

export const workScheduleValidator = (
  value: string | number | undefined
): ReturnType<FieldValidator<unknown>> => {
  const numberValue = Number(value)

  if (!Number.isInteger(numberValue)) {
    return 'Must be a valid non-decimal number.'
  }

  if (numberValue > MAX_VALUE) {
    return 'Must be less than or equal to 168.'
  }

  if (numberValue < MIN_VALUE) {
    return 'Must be greater than or equal to 0.'
  }
}
