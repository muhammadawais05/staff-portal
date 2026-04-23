import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  ApproveGigDocument,
  ApproveGigMutation
} from './approve-gig-request.staff.gql.types'

export const APPROVE_GIG_REQUEST: typeof ApproveGigDocument = gql`
  mutation ApproveGig($gigId: ID!) {
    approveGig(input: { gigId: $gigId }) {
      ...MutationResultFragment
      gig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveGigRequest = ({
  gigId,
  onCompleted,
  onError
}: {
  gigId: string
  onCompleted?: (data: ApproveGigMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(APPROVE_GIG_REQUEST, {
    variables: { gigId },
    onCompleted,
    onError
  })
