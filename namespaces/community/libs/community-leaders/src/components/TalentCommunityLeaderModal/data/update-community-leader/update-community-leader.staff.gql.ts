import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateCommunityLeaderDocument } from './update-community-leader.staff.gql.types'

export const UPDATE_COMMUNITY_LEADER: typeof UpdateCommunityLeaderDocument = gql`
  mutation UpdateCommunityLeader($input: UpdateCommunityLeaderInput!) {
    updateCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
export const useUpdateCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(UPDATE_COMMUNITY_LEADER, {
    onError
  })
