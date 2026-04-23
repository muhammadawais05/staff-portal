import {
  ApolloError,
  TypedDocumentNode
} from '@staff-portal/data-layer-service'

import type { MutationResult } from '../../form-error-handler'

export type UseChangeHandlerUtilsProps<
  TMutationResponse extends Record<string, TMutationResult | null>,
  TMutationResult extends MutationResult,
  TMutationInput extends Record<string, unknown>,
  MutationVariables
> = {
  mutationDocument: TypedDocumentNode<
    TMutationResponse,
    { input: TMutationInput } & MutationVariables
  >
  onCompleted?: (data: TMutationResponse) => void
  onError?: (error: ApolloError) => void
}
