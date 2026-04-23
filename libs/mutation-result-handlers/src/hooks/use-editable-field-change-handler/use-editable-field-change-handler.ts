import { TypedMessage } from '@toptal/staff-portal-message-bus'

import { UseChangeHandlerProps } from '../../types'
import { MutationResult } from '../../form-error-handler'
import { useChangeHandlerUtils } from '../use-change-handler-utils'
import { createMutationResultOptions } from '../../utils'

export const useEditableFieldChangeHandler = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<PropertyKey, unknown>,
  TInitialValues extends Partial<TMutationInput>,
  TEmitMessageType extends TypedMessage<unknown>,
  MutationVariables extends { input: TMutationInput }
>({
  mutationDocument,
  requiredValues,
  initialValues,
  isValueChanged,
  mutationResultOptions,
  onCompleted
}: UseChangeHandlerProps<
  TMutationResponse,
  TMutationResult,
  TMutationInput,
  TInitialValues,
  TEmitMessageType,
  MutationVariables
>) => {
  const { mutate, emitMessage, handleMutationResult } = useChangeHandlerUtils<
    TMutationResponse,
    TMutationResult,
    TMutationInput,
    MutationVariables
  >({ mutationDocument, onCompleted })

  return async (key: keyof TMutationInput, input: Partial<TMutationInput>) => {
    // check if value changed
    if (isValueChanged) {
      if (!isValueChanged(key, initialValues, input)) {
        return
      }
    } else if (
      (initialValues[key] ?? undefined) === (input[key] ?? undefined)
    ) {
      return
    }

    const response = await mutate({
      variables: {
        input: {
          ...requiredValues,
          ...input
        } as TMutationInput
      } as MutationVariables
    })

    const { data: responseData, errors } = response

    const options = createMutationResultOptions(
      responseData,
      emitMessage,
      input,
      mutationResultOptions
    )

    return handleMutationResult({ ...options, rootLevelErrors: errors })
  }
}
