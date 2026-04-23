import { FieldValidator } from '@toptal/picasso-forms'
import { NUMBER_OF_CHARACTER_LIMIT } from '@staff-portal/config'

import { FieldValidators } from '../types'

const VALID_TOPTAL_EMAIL_REGEXP = /^\S+@toptal.com$/

export const isRequired = (
  value: unknown
): ReturnType<FieldValidator<unknown>> => {
  if (!value || (Array.isArray(value) && !value.length)) {
    return 'Please complete the required information'
  }
}

export const isRequiredShort = (
  value: unknown
): ReturnType<FieldValidator<unknown>> => {
  if (isRequired(value)) {
    return 'Required field.'
  }
}

export const isValidToptalEmail = (email: string) =>
  !email.match(VALID_TOPTAL_EMAIL_REGEXP)
    ? 'Must be a valid Toptal email'
    : null

export const isMaxLength = (
  value?: string | null
): ReturnType<FieldValidator<string | null | undefined>> => {
  if (typeof value === 'string' && value.length > NUMBER_OF_CHARACTER_LIMIT) {
    return `Please write less than ${NUMBER_OF_CHARACTER_LIMIT} characters`
  }
}

export const greaterThan =
  (compareValue: number) =>
  (value: string | number): string | undefined =>
    Number(value) > compareValue
      ? undefined
      : `Must be greater than ${compareValue}`

export const greaterThanOrEqual =
  (minValue: number) =>
  (value: string | number): string | undefined =>
    Number(value) >= minValue
      ? undefined
      : `Must be greater than or equal to ${minValue}`

export const positiveNumber = greaterThan(0)

export const validateIf =
  <FieldValue, FormValues extends object>(
    shouldValidate: (formValues: FormValues) => boolean,
    validators: FieldValidators<FieldValue>
  ): FieldValidator<FieldValue> =>
  (value, allValues = {}, ...args) => {
    if (!shouldValidate(allValues as FormValues)) {
      return
    }

    return getValidator(validators)?.(value, allValues, ...args)
  }

export const getValidator = <FieldValue>(
  validators?: FieldValidators<FieldValue>
): FieldValidator<FieldValue> | undefined =>
  Array.isArray(validators) ? combine(...validators) : combine(validators)

export const combine =
  <FieldValue>(
    ...validators: (FieldValidator<FieldValue> | undefined)[]
  ): FieldValidator<FieldValue> =>
  (value, allValues = {}, ...args) =>
    validators.reduce(
      (
        error: ReturnType<FieldValidator<FieldValue>>,
        validator?: FieldValidator<FieldValue>
      ): ReturnType<FieldValidator<FieldValue>> | undefined =>
        error || validator?.(value, allValues, ...args),
      undefined
    )
