import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  CompleteGigDocument,
  CompleteGigMutation
} from './complete-gig-request.staff.gql.types'

export const COMPLETE_GIG_REQUEST: typeof CompleteGigDocument = gql`
  mutation CompleteGig($gigId: ID!) {
    completeGig(input: { gigId: $gigId }) {
      ...MutationResultFragment
      gig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCompleteGigRequest = ({
  gigId,
  onCompleted,
  onError
}: {
  gigId: string
  onCompleted?: (data: CompleteGigMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(COMPLETE_GIG_REQUEST, {
    variables: { gigId },
    onCompleted,
    onError
  })
