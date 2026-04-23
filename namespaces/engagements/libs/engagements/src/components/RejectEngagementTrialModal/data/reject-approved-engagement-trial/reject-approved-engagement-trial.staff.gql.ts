import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RejectApprovedEngagementTrialDocument } from './reject-approved-engagement-trial.staff.gql.types'

export const REJECT_APPROVED_ENGAGEMENT_TRIAL = gql`
  mutation RejectApprovedEngagementTrial(
    $input: RejectApprovedEngagementTrialInput!
  ) {
    rejectApprovedEngagementTrial(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectApprovedEngagementTrial = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(RejectApprovedEngagementTrialDocument, { onError })
