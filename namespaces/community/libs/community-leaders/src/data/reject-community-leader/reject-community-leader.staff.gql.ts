import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RejectCommunityLeaderApplicationDocument } from './reject-community-leader.staff.gql.types'

export const REJECT_COMMUNITY_LEADER: typeof RejectCommunityLeaderApplicationDocument = gql`
  mutation RejectCommunityLeaderApplication($id: ID!, $comment: String!) {
    rejectCommunityLeaderApplication(
      input: { id: $id, performerComment: $comment }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRejectCommunityLeaderApplication = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(REJECT_COMMUNITY_LEADER, {
    onError
  })
