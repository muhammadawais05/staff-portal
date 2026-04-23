import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  EditEngagementCommitmentMutation,
  EditEngagementCommitmentDocument
} from './edit-engagement-commitment.staff.gql.types'

export const EDIT_ENGAGEMENT_COMMITMENT: typeof EditEngagementCommitmentDocument = gql`
  mutation EditEngagementCommitment($input: EditEngagementCommitmentInput!) {
    editEngagementCommitment(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useEditEngagementCommitment = ({
  onError,
  onCompleted
}: {
  onError?: (error: Error) => void
  onCompleted?: (data: EditEngagementCommitmentMutation) => void
} = {}) => useMutation(EDIT_ENGAGEMENT_COMMITMENT, { onError, onCompleted })
