import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT } from '@staff-portal/talents-coaching'

import { GetCoachingEngagementsForTalentDocument } from './get-talent-coaching-engagements.staff.gql.types'

export const GET_TALENT_COACHING_ENGAGEMENTS: typeof GetCoachingEngagementsForTalentDocument = gql`
  query GetCoachingEngagementsForTalent(
    $talentId: ID!
    $loadDisputeOperations: Boolean!
  ) {
    node(id: $talentId) {
      ... on Talent {
        id
        coachingEngagements {
          nodes {
            ...TalentCoachingEngagementWithActivitiesFragment
          }

          totalCount
        }
      }
    }
  }

  ${TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT}
`

export const useGetTalentCoachingEngagements = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_COACHING_ENGAGEMENTS,
    {
      variables: { talentId, loadDisputeOperations: true }
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
