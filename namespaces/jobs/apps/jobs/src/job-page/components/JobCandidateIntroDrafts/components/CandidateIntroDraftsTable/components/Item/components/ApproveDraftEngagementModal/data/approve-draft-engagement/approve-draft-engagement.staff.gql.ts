import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ApproveDraftEngagementDocument } from './approve-draft-engagement.staff.gql.types'

export default gql`
  mutation ApproveDraftEngagement($input: ApproveDraftEngagementInput!) {
    approveDraftEngagement(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveDraftEngagement = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(ApproveDraftEngagementDocument, { onError })
