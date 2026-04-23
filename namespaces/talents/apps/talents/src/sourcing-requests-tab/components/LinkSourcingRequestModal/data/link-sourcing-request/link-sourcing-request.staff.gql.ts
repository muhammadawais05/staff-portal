import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  LinkSourcingRequestDocument,
  LinkSourcingRequestMutation,
  LinkSourcingRequestMutationVariables
} from './link-sourcing-request.staff.gql.types'

export const LINK_SOURCING_REQUEST: typeof LinkSourcingRequestDocument = gql`
  mutation LinkSourcingRequest($input: LinkSourcingRequestInput!) {
    linkSourcingRequest(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useLinkSourcingRequest = (
  talentId: string,
  options?: MutationHookOptions<
    LinkSourcingRequestMutation,
    LinkSourcingRequestMutationVariables
  >
) => {
  const [linkSourcingRequest, { loading }] = useMutation(
    LINK_SOURCING_REQUEST,
    options
  )

  return {
    linkSourcingRequest: (
      talentId: string, // eslint-disable-line @typescript-eslint/no-shadow
      jobId: string // eslint-disable-line @typescript-eslint/no-shadow
    ) => linkSourcingRequest({ variables: { input: { talentId, jobId } } }),
    loading
  }
}
