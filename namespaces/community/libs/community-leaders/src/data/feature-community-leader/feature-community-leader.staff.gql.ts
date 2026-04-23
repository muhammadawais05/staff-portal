import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { FeatureCommunityLeaderDocument } from './feature-community-leader.staff.gql.types'

export default gql`
  mutation FeatureCommunityLeader($input: FeatureCommunityLeaderInput!) {
    featureCommunityLeader(input: $input) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useFeatureCommunityLeader = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(FeatureCommunityLeaderDocument, {
    onError
  })
