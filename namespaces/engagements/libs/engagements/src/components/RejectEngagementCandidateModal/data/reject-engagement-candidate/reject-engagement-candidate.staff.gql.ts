import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RejectEngagementOnInterviewDocument } from './reject-engagement-candidate.staff.gql.types'

export const REJECT_ENGAGEMENT_ON_INTERVIEW = gql`
  mutation RejectEngagementOnInterview(
    $input: RejectEngagementOnInterviewInput!
  ) {
    rejectEngagementOnInterview(input: $input) {
      ...MutationResultFragment
      engagement {
        id
        job {
          id
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectEngagementCandidate = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(RejectEngagementOnInterviewDocument, { onError })
