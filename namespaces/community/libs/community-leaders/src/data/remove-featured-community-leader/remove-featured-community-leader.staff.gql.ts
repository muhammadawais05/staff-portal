import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UnfeatureCommunityLeaderDocument } from './remove-featured-community-leader.staff.gql.types'

export default gql`
  mutation UnfeatureCommunityLeader($input: UnfeatureCommunityLeaderInput!) {
    unfeatureCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useRemoveFeaturedCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(UnfeatureCommunityLeaderDocument, {
    onError
  })
