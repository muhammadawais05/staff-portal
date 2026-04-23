import {
  gql,
  MutationHookOptions,
  useMutation
} from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import {
  LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT,
  UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT
} from '@staff-portal/jobs'

import {
  LinkJobSourcingRequestDocument,
  LinkJobSourcingRequestMutation,
  LinkJobSourcingRequestMutationVariables
} from './link-sourcing-request.staff.gql.types'

export const LINK_SOURCING_REQUEST: typeof LinkJobSourcingRequestDocument = gql`
  mutation LinkJobSourcingRequest($input: LinkSourcingRequestInput!) {
    linkSourcingRequest(input: $input) {
      job {
        id
        sourcingRequest {
          id
          ...LinkedSourcingRequestTalentsFragment
          ...UnlinkedSourcingRequestTalentsFragment
        }
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
  ${UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
`

export const useLinkJobSourcingRequest = (
  options?: MutationHookOptions<
    LinkJobSourcingRequestMutation,
    LinkJobSourcingRequestMutationVariables
  >
) => {
  const [linkSourcingRequest, { loading }] = useMutation(
    LINK_SOURCING_REQUEST,
    {
      ...options
    }
  )

  return {
    linkSourcingRequest: (
      talentId: string, // eslint-disable-line @typescript-eslint/no-shadow
      jobId: string // eslint-disable-line @typescript-eslint/no-shadow
    ) => linkSourcingRequest({ variables: { input: { talentId, jobId } } }),
    loading
  }
}
