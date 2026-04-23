import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  ClaimGigDocument,
  ClaimGigMutation
} from './claim-gig-request.staff.gql.types'

export const CLAIM_GIG_REQUEST: typeof ClaimGigDocument = gql`
  mutation ClaimGig($gigId: ID!) {
    claimGig(input: { gigId: $gigId }) {
      ...MutationResultFragment
      gig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useClaimGigRequest = ({
  gigId,
  onCompleted,
  onError
}: {
  gigId: string
  onCompleted?: (data: ClaimGigMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CLAIM_GIG_REQUEST, {
    variables: { gigId },
    onCompleted,
    onError
  })
