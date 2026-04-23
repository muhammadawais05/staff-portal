import { ReactNode } from 'react'
import type { OptionsObject } from 'notistack'
import { SubmissionErrors } from '@toptal/picasso-forms'
import { capitalize, useNotifications } from '@toptal/picasso/utils'
import { GraphQLError } from 'graphql'
import parse from 'html-react-parser'
import { UserError } from '@staff-portal/graphql/staff'

import { getFormErrors } from '../../utils'
import { ORIGINAL_ERRORS_KEY } from '../../config'
import { FormErrors, MutationResult } from '../../types'

export type HandleMutationResultOptions<T extends MutationResult> = {
  onSuccessAction?: (mutationResult: T) => void
  successNotificationMessage?: ReactNode
  successNotificationOptions?: OptionsObject
  mutationResult: T | null | undefined
  returnAllErrors?: boolean
  isFormSubmit?: boolean
  capitalizeErrors?: boolean
  rootLevelErrors?: readonly GraphQLError[]
}

export const useHandleMutationResult = () => {
  const { showError, showSuccess } = useNotifications()

  const handleErrors = (
    errors: UserError[],
    {
      returnAllErrors,
      returnFormBaseError,
      rootLevelErrors
    }: {
      returnAllErrors?: boolean
      returnFormBaseError?: boolean
      rootLevelErrors?: readonly GraphQLError[]
    }
  ) => {
    const { validationErrors: validationOnly, formWideError } = getFormErrors(
      errors,
      returnFormBaseError
    )

    if (rootLevelErrors?.length) {
      showError(
        parse(rootLevelErrors.map(({ message }) => message).join('<br/>'))
      )
    }

    if (!returnFormBaseError && formWideError) {
      showError(parse(formWideError))
    }

    const validationErrors = {
      ...validationOnly,
      [ORIGINAL_ERRORS_KEY]: errors
    }

    if (returnAllErrors) {
      return { validationErrors, formWideError }
    }

    return validationErrors
  }

  return {
    handleMutationResult: <T extends MutationResult>({
      mutationResult,
      successNotificationMessage = '',
      successNotificationOptions,
      onSuccessAction,
      returnAllErrors,
      isFormSubmit,
      capitalizeErrors = false,
      rootLevelErrors
    }: HandleMutationResultOptions<T>):
      | SubmissionErrors
      | FormErrors
      | void => {
      if (!mutationResult && !rootLevelErrors?.length) {
        return
      }

      if (mutationResult?.success) {
        if (successNotificationMessage) {
          if (successNotificationOptions) {
            showSuccess(
              successNotificationMessage,
              undefined,
              successNotificationOptions
            )
          } else {
            showSuccess(successNotificationMessage)
          }
        }

        onSuccessAction?.(mutationResult)

        return
      }

      const processedErrors = capitalizeErrors
        ? mutationResult?.errors.map(error => ({
            ...error,
            message: capitalize(error.message)
          }))
        : mutationResult?.errors

      return handleErrors(processedErrors ?? [], {
        returnAllErrors,
        returnFormBaseError: isFormSubmit,
        rootLevelErrors
      })
    }
  }
}
