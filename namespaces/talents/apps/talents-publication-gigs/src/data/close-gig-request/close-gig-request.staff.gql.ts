import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { GIG_FRAGMENT } from '@staff-portal/talents-gigs'

import {
  CloseGigMutation,
  CloseGigDocument
} from './close-gig-request.staff.gql.types'

export const CLOSE_GIG_REQUEST: typeof CloseGigDocument = gql`
  mutation CloseGig($gigId: ID!, $closingReason: String!) {
    closeGig(input: { gigId: $gigId, closingReason: $closingReason }) {
      ...MutationResultFragment
      gig {
        ...GigFragment
      }
    }
  }

  ${GIG_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useCloseGigRequest = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: CloseGigMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(CLOSE_GIG_REQUEST, {
    onCompleted,
    onError
  })
