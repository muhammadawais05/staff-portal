import { AnyObject, FORM_ERROR, setIn } from '@toptal/picasso-forms'
import React, { ChangeEvent, FocusEvent } from 'react'
import { MutationFunctionOptions, FetchResult } from '@apollo/client'
import { camelCase, isEmpty, upperFirst } from 'lodash-es'
import { UserError } from '@staff-portal/graphql/staff'
import { MAX_INT_LENGTH } from '@staff-portal/config'

import { BaseSubmitParams, submitMutation } from '../../helpers/apollo'

export const cleanNumberValueWithLimit =
  (limit = MAX_INT_LENGTH, fractionalLimit = 2, allowNegative = false) =>
  (value: string | number) => {
    const limitRegexp = new RegExp(
      `([0-9]{${limit}})([0-9]*)(.[0-9]{${fractionalLimit}})*([0-9]*)`
    )
    const cleanupRegexp = allowNegative ? /[^0-9.-]/g : /[^0-9.]/g

    return value
      .toString()
      .replace(cleanupRegexp, '')
      .replace(limitRegexp, '$1$3')
      .split('.')
      .slice(0, 2)
      .join('.')
  }

export const cleanNumberValue = cleanNumberValueWithLimit()
export const cleanNegativeNumberValue = cleanNumberValueWithLimit(
  MAX_INT_LENGTH,
  2,
  true
)

export const formatCleanNumberValue = (value?: string | number) =>
  (value && Number(cleanNumberValue(value)).toFixed(2)) || ''

export const formatCleanNegativeNumberValue = (value?: string | number) =>
  (value && Number(cleanNegativeNumberValue(value)).toFixed(2)) || ''

export const amountCleanNumberValue = cleanNumberValueWithLimit(MAX_INT_LENGTH)

// limits the input to two whole-number places (0-99)
// currently used for purchase orders threshold editing only
// do not use if you need to enter a 100% (or more) value
export const percentCleanNumberValue = cleanNumberValueWithLimit(2)

export const convertToInteger = (value = '') => {
  if (value === '' || value === null) {
    return ''
  }

  const integer = parseInt(Number(value).toString())

  return Number.isNaN(integer) ? '' : integer.toString()
}

export const onChangeToFloatNumber =
  (onChangeCallback: (value: string) => void) =>
  ({
    target: { value }
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >): void =>
    onChangeCallback(cleanNumberValue(value))

export const onBlurToFloatNumber =
  (
    onChangeCallback: (value: string) => void,
    onBlurCallback: (value: string) => void
  ) =>
  ({
    target: { value }
  }: FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >): void => {
    const cleanedValue = value && Number(cleanNumberValue(value)).toFixed(2)

    onChangeCallback(cleanedValue)
    onBlurCallback(cleanedValue)
  }

export interface GeneralResponse {
  data: {
    [key: string]: {
      errors: UserError[]
    }
  }
  errors?: UserError[]
}

const hasNestedField = (key = '') =>
  ['[', '.'].some(delimeter => key.includes(delimeter))

export const handleOnSubmissionError =
  (responseKey: string) => (response: GeneralResponse) => {
    const errors = response?.data?.[responseKey]?.errors || response?.errors

    if (!errors?.length) {
      return
    }

    const formErrors = errors.reduce(
      (acc: AnyObject, { key, message }: UserError) => {
        let errorObjectKey: string

        if (key === 'base' || key.includes('base')) {
          errorObjectKey = FORM_ERROR
        } else if (hasNestedField(key)) {
          errorObjectKey = key
        } else {
          errorObjectKey = camelCase(key)
        }

        const currentField = acc[errorObjectKey]

        acc[errorObjectKey] = currentField ? (
          <>
            {upperFirst(currentField)}
            <br />
            {upperFirst(message)}
          </>
        ) : (
          upperFirst(message)
        )

        return acc
      },
      {}
    )

    const validationKeys = Object.keys(formErrors)
    // code was copied from https://github.com/toptal/staff-portal/blob/master/libs/mutation-result-handlers/src/form-error-handler/utils/get-form-errors/get-form-errors.ts
    const validationErrors =
      validationKeys.length > 0
        ? validationKeys.reduce(
            (errorObject, key) =>
              setIn(errorObject, key, formErrors[key]) as Record<
                string,
                string
              >,
            {} as Record<string, string>
          )
        : undefined

    return validationErrors
  }

interface HandleSubmitParams<T, V> extends BaseSubmitParams {
  adjustValues?: (mergedValues: AnyObject) => AnyObject
  adjustBeforeValidate?: boolean
  extractData?: Function
  submit: (options: MutationFunctionOptions<T, V>) => Promise<FetchResult<T>>
  validate?: (inputValues: AnyObject) => AnyObject
  variables?: AnyObject
}

export const handleSubmit =
  <T, V>({
    adjustValues,
    adjustBeforeValidate = true,
    beforeAction,
    handleError,
    handleSuccess,
    responseKey,
    spreadInputProps,
    submit,
    updateCache,
    validate,
    variables = {}
  }: HandleSubmitParams<T, V>) =>
  (values: AnyObject) => {
    const mergedValues = { ...variables, ...values }
    const input = adjustValues ? adjustValues(mergedValues) : mergedValues
    const submissionErrors = validate
      ? validate(adjustBeforeValidate ? input : mergedValues)
      : {}

    if (!isEmpty(submissionErrors)) {
      return submissionErrors
    }

    return submitMutation({
      beforeAction,
      handleError,
      handleSuccess,
      input,
      responseKey,
      spreadInputProps,
      submit,
      updateCache
    })
  }
