import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ApproveCommunityLeaderDocument } from './approve-community-leader.staff.gql.types'

export const APPROVE_COMMUNITY_LEADER: typeof ApproveCommunityLeaderDocument = gql`
  mutation ApproveCommunityLeader($id: ID!, $comment: String) {
    approveCommunityLeaderApplication(
      input: { id: $id, performerComment: $comment }
    ) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useApproveCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(APPROVE_COMMUNITY_LEADER, {
    onError
  })
