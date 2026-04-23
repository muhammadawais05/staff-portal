import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RestoreCommunityLeaderDocument } from './restore-community-leader.staff.gql.types'

export const RESTORE_COMMUNITY_LEADER: typeof RestoreCommunityLeaderDocument = gql`
  mutation RestoreCommunityLeader($input: RestoreCommunityLeaderInput!) {
    restoreCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
export const useRestoreCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(RESTORE_COMMUNITY_LEADER, {
    onError
  })
