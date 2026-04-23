import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RejectEngagementTrialDocument } from './reject-engagement-trial.staff.gql.types'

export const REJECT_ENGAGEMENT_TRIAL = gql`
  mutation RejectEngagementTrial($input: RejectEngagementTrialInput!) {
    rejectEngagementTrial(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectEngagementTrial = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(RejectEngagementTrialDocument, { onError })
