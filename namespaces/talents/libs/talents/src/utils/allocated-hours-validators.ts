import { FieldValidator } from '@toptal/picasso-forms'

type InputType = string | number | undefined

const isBlankString = (value: InputType) => `${value}`.trim().length === 0

export const allocatedHoursValidator = (
  value: InputType
): ReturnType<FieldValidator<unknown>> => {
  const MIN_VALUE = 0
  const MAX_VALUE = 168

  if (!Number.isInteger(Number(value)) || isBlankString(value)) {
    return 'Must be a valid non-decimal number.'
  }

  if (Number(value) > MAX_VALUE) {
    return 'Must be less than or equal to 168.'
  }

  if (Number(value) < MIN_VALUE) {
    return 'Must be greater than or equal to 0.'
  }
}

export const requiredValidator = (
  value: InputType
): ReturnType<FieldValidator<unknown>> => {
  if (!value || isBlankString(value)) {
    return 'You must specify allocated hours.'
  }
}
