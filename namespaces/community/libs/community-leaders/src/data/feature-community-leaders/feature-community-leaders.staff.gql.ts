import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ReorderFeaturedCommunityLeadersDocument } from './feature-community-leaders.staff.gql.types'

export const REORDER_FEATURED_COMMUNITY_LEADERS: typeof ReorderFeaturedCommunityLeadersDocument = gql`
  mutation ReorderFeaturedCommunityLeaders($leaderIds: [ID!]!) {
    reorderFeaturedCommunityLeaders(input: { leaderIds: $leaderIds }) {
      ...MutationResultFragment
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`

export const useReorderFeaturedCommunityLeaders = ({
  onError
}: {
  onError: () => void
}) =>
  useMutation(REORDER_FEATURED_COMMUNITY_LEADERS, {
    onError
  })
