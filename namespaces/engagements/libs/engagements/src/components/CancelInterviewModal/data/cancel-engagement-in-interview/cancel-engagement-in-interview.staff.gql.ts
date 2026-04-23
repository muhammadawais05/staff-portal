import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CancelEngagementInInterviewDocument } from './cancel-engagement-in-interview.staff.gql.types'

export const CANCEL_ENGAGEMENT_IN_INTERVIEW = gql`
  mutation CancelEngagementInInterview(
    $input: CancelEngagementInInterviewInput!
  ) {
    cancelEngagementInInterview(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCancelEngagementInInterview = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(CancelEngagementInInterviewDocument, { onError })
