import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CancelEngagementDraftInInterviewDocument } from './cancel-engagement-draft-in-interview.staff.gql.types'

export const CANCEL_ENGAGEMENT_DRAFT_IN_INTERVIEW = gql`
  mutation CancelEngagementDraftInInterview(
    $input: CancelEngagementDraftInInterviewInput!
  ) {
    cancelEngagementDraftInInterview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCancelEngagementDraftInInterview = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(CancelEngagementDraftInInterviewDocument, { onError })
