import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RejectDraftEngagementDocument } from './reject-draft-engagement.staff.gql.types'

export const REJECT_DRAFT_ENGAGEMENT = gql`
  mutation RejectDraftEngagement($input: RejectDraftEngagementInput!) {
    rejectDraftEngagement(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectDraftEngagement = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(RejectDraftEngagementDocument, { onError })
