import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { AppointCommunityLeaderDocument } from './appoint-community-leader.staff.gql.types'

export const APPOINT_COMMUNITY_LEADER: typeof AppointCommunityLeaderDocument = gql`
  mutation AppointCommunityLeader($input: AppointCommunityLeaderInput!) {
    appointCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
export const useAppointCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(APPOINT_COMMUNITY_LEADER, {
    onError
  })
