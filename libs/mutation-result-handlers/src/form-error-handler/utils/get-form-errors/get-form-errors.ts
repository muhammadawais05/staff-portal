import { setIn, FORM_ERROR } from '@toptal/picasso-forms'
import { kebabToCamelCase } from '@toptal/picasso/utils'
import { UserError } from '@staff-portal/graphql/staff'

import { BASE_ERROR_KEY } from '../../config'
import { FormErrors } from '../../types'

export const getFormErrors = (
  errors: UserError[],
  returnFormBaseError?: boolean
): FormErrors => {
  const formBaseError: string[] = []
  const errorsObject = Object.fromEntries(
    errors.map(({ key, message }) => {
      if (key === BASE_ERROR_KEY) {
        formBaseError.push(message)
      }
      if (!key.includes('[')) {
        return [kebabToCamelCase(key), message]
      }

      return [key, message]
    })
  )

  // exclude base error from validation errors
  delete errorsObject[BASE_ERROR_KEY]
  // will be parsed to a react element on `useHandleMutationResult` level
  const formWideError = formBaseError.join('<br/>') || undefined

  const validationKeys = Object.keys(errorsObject)
  let validationErrors:
    | Record<string, string>
    | undefined = validationKeys.length
    ? validationKeys.reduce(
        (errorObject, key) =>
          setIn(errorObject, key, errorsObject[key]) as Record<string, string>,
        {} as Record<string, string>
      )
    : undefined

  if (returnFormBaseError && formWideError) {
    validationErrors = validationErrors || {}
    validationErrors[FORM_ERROR] = formWideError
  }

  return {
    formWideError,
    validationErrors
  }
}
