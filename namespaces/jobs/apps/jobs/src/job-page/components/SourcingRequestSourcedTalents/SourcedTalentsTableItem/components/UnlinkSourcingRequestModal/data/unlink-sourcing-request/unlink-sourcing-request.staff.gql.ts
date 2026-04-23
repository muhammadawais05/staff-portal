import { gql, useMutation } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import {
  SOURCING_REQUEST_TALENT_FRAGMENT,
  LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT,
  UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT
} from '@staff-portal/jobs'

import {
  UnlinkSourcingRequestDocument,
  UnlinkSourcingRequestMutation
} from './unlink-sourcing-request.staff.gql.types'

export const UNLINK_SOURCING_REQUEST: typeof UnlinkSourcingRequestDocument = gql`
  mutation UnlinkSourcingRequest($input: UnlinkSourcingRequestTalentInput!) {
    unlinkSourcingRequestTalent(input: $input) {
      sourcingRequestTalent {
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
  ${SOURCING_REQUEST_TALENT_FRAGMENT}
  ${LINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
  ${UNLINKED_SOURCING_REQUEST_TALENTS_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useUnlinkSourcingRequest = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UnlinkSourcingRequestMutation) => void
  onError: (error: Error) => void
}) => {
  const [unlinkSourcingRequestTalent, { loading }] = useMutation(
    UNLINK_SOURCING_REQUEST,
    {
      onError,
      onCompleted
    }
  )

  return {
    unlinkSourcingRequestTalent: (
      sourcingRequestTalentId: string,
      comment: string
    ) =>
      unlinkSourcingRequestTalent({
        variables: { input: { sourcingRequestTalentId, comment } }
      }),
    loading
  }
}
