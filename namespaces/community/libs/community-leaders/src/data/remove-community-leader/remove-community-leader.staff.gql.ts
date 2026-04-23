import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { RemoveCommunityLeaderDocument } from './remove-community-leader.staff.gql.types'

export const REMOVE_COMMUNITY_LEADER: typeof RemoveCommunityLeaderDocument = gql`
  mutation RemoveCommunityLeader($input: RemoveCommunityLeaderInput!) {
    removeCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(REMOVE_COMMUNITY_LEADER, {
    onError
  })
