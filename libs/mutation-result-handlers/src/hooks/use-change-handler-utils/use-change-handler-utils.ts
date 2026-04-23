import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'

import {
  MutationResult,
  useHandleMutationResult
} from '../../form-error-handler'
import { UseChangeHandlerUtilsProps } from './types'

export const useChangeHandlerUtils = <
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<PropertyKey, unknown>,
  MutationVariables extends { input: TMutationInput }
>({
  mutationDocument,
  onCompleted,
  onError
}: UseChangeHandlerUtilsProps<
  TMutationResponse,
  TMutationResult,
  TMutationInput,
  MutationVariables
>) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [mutate, { loading, called, error, data }] = useMutation<
    TMutationResponse,
    { input: TMutationInput } & MutationVariables
  >(mutationDocument, { onCompleted, onError })

  const emitMessage = useMessageEmitter()

  return {
    handleMutationResult,
    mutate,
    emitMessage,
    loading,
    called,
    error,
    data
  }
}
