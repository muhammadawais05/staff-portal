import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const HOLD_COMMUNITY_LEADER = gql`
  mutation HoldCommunityLeaderApplication($id: ID!, $comment: String!) {
    holdCommunityLeaderApplication(input: { id: $id, holdComment: $comment }) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useHoldCommunityLeader = ({ onError }: { onError: () => void }) =>
  useMutation(HOLD_COMMUNITY_LEADER, {
    onError
  })
