import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ChangeEngagementTrialLengthDocument,
  ChangeEngagementTrialLengthMutation
} from './change-engagement-trial-length.staff.gql.types'

export const CHANGE_ENGAGEMENT_TRIAL_LENGTH = gql`
  mutation ChangeEngagementTrialLength(
    $input: ChangeEngagementTrialLengthInput!
  ) {
    changeEngagementTrialLength(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useChangeEngagementTrialLength = ({
  onError,
  onCompleted
}: {
  onError?: (error: Error) => void
  onCompleted?: (data: ChangeEngagementTrialLengthMutation) => void
}) => useMutation(ChangeEngagementTrialLengthDocument, { onError, onCompleted })
