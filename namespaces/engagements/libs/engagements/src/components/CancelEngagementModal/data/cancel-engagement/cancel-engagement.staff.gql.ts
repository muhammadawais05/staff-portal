import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CancelEngagementDocument } from './cancel-engagement.staff.gql.types'

export const CANCEL_ENGAGEMENT = gql`
  mutation CancelEngagement($input: CancelEngagementTrialInput!) {
    cancelEngagementTrial(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCancelEngagement = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(CancelEngagementDocument, { onError })
