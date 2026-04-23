import type {
  TypedMessage,
  useMessageEmitter
} from '@toptal/staff-portal-message-bus'

import type { MutationResult } from '../form-error-handler'
import type { HandleMutationResultOptions } from '../form-error-handler/hooks'
import { UseChangeHandlerProps } from '../types'
import { getFirstResponseDataKey } from './get-first-response-data-key'

type EmitterType = ReturnType<typeof useMessageEmitter>

export const createMutationResultOptions = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>,
  TInitialValues extends Partial<TMutationInput>,
  TEmitMessageType extends TypedMessage<unknown>,
  MutationVariables
>(
  responseData: TMutationResponse | null | undefined,
  emit: EmitterType,
  input: Partial<TMutationInput>,
  options?: UseChangeHandlerProps<
    TMutationResponse,
    TMutationResult,
    TMutationInput,
    TInitialValues,
    TEmitMessageType,
    MutationVariables
  >['mutationResultOptions']
): HandleMutationResultOptions<TMutationResult> => {
  const responseKey =
    options?.mutationResult || getFirstResponseDataKey(responseData)

  // if have no options set mutationResult as the responseData first key content
  if (!options) {
    return {
      mutationResult: responseKey ? responseData?.[responseKey] : null,
      isFormSubmit: true
    }
  }

  const {
    mutationResult = responseKey,
    successMessageEmitOptions: successMessage,
    onSuccessAction,
    successNotificationMessage,
    ...rest
  } = options

  let successActionHandler = onSuccessAction

  if (successMessage) {
    const { type, payload } = successMessage

    successActionHandler = (_mutationResult: TMutationResult) => {
      onSuccessAction?.(_mutationResult)
      emit(type, payload)
    }
  }

  const successNotificationMessageText =
    typeof successNotificationMessage === 'function'
      ? successNotificationMessage(input)
      : successNotificationMessage

  return {
    mutationResult: mutationResult ? responseData?.[mutationResult] : null,
    onSuccessAction: successActionHandler,
    isFormSubmit: true,
    successNotificationMessage: successNotificationMessageText,
    ...rest
  }
}
