import { useNotifications } from '@toptal/picasso/utils'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import { SubmissionErrors } from '@toptal/picasso-forms'

import { OptionalKeys, UseModalFormChangeHandlerProps } from '../../types'
import { FormErrors, MutationResult } from '../../form-error-handler'
import { createMutationResultOptions } from '../../utils'
import { useChangeHandlerUtils } from '../use-change-handler-utils'

export const useModalFormChangeHandler = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult = MutationResult,
  TMutationInput extends Record<PropertyKey, unknown> = Record<
    PropertyKey,
    unknown
  >,
  TInitialValues extends Partial<TMutationInput> = Partial<TMutationInput>,
  TEmitMessageType extends TypedMessage<unknown> = TypedMessage<unknown>,
  MutationVariables extends { input: TMutationInput } = {
    input: TMutationInput
  }
>({
  mutationDocument,
  mutationResultOptions,
  errorNotificationMessage,
  onCompleted,
  onError
}: UseModalFormChangeHandlerProps<
  TMutationResponse,
  TMutationResult,
  TMutationInput,
  TInitialValues,
  TEmitMessageType,
  MutationVariables
>) => {
  const { showError } = useNotifications()
  const { mutate, emitMessage, handleMutationResult, loading } =
    useChangeHandlerUtils<
      TMutationResponse,
      TMutationResult,
      TMutationInput,
      MutationVariables
    >({
      mutationDocument,
      onCompleted,
      onError: error => {
        if (errorNotificationMessage) {
          showError(errorNotificationMessage)
        }

        onError?.(error)
      }
    })

  const handleSubmit = async (input: TMutationInput) => {
    const response = await mutate({
      variables: {
        input
      } as MutationVariables
    })

    const { data: responseData, errors } = response

    const options = createMutationResultOptions(
      responseData,
      emitMessage,
      input,
      mutationResultOptions
    )

    return handleMutationResult({ rootLevelErrors: errors, ...options })
  }

  const handleSubmitExtended = async (variables: MutationVariables) => {
    const response = await mutate({ variables })

    const { data: responseData, errors } = response

    const options = createMutationResultOptions(
      responseData,
      emitMessage,
      variables.input,
      mutationResultOptions
    )

    return handleMutationResult({ rootLevelErrors: errors, ...options })
  }

  type RestVariables = Omit<MutationVariables, 'input'>
  type RestKeys = keyof RestVariables

  return {
    handleSubmit: handleSubmit as Exclude<
      RestKeys,
      OptionalKeys<RestVariables>
    > extends never
      ? (input: TMutationInput) => Promise<SubmissionErrors | FormErrors | void>
      : never, // if rest keys contain at least one non-optional key
    handleSubmitExtended,
    loading
  }
}
