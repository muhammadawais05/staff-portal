import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT } from '@staff-portal/talents-coaching'

import {
  GetTalentCoachingEngagementsListDocument,
  GetTalentCoachingEngagementsListQueryVariables
} from './get-talent-coaching-engagements-list.staff.gql.types'

export const GET_TALENT_COACHING_ENGAGEMENTS_LIST = gql`
  query GetTalentCoachingEngagementsList(
    $filter: TalentCoachingEngagementFilter!
    $order: TalentCoachingEngagementOrder!
    $pagination: OffsetPagination!
    $loadDisputeOperations: Boolean!
  ) {
    talentCoachingEngagements(
      filter: $filter
      order: $order
      pagination: $pagination
    ) {
      nodes {
        ...TalentCoachingEngagementWithActivitiesFragment
      }
      totalCount
    }
  }

  ${TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT}
`
export const useGetTalentCoachingEngagementsList = (
  variables: GetTalentCoachingEngagementsListQueryVariables,
  skip?: boolean
) => {
  const { data, loading, error, ...rest } = useQuery(
    GetTalentCoachingEngagementsListDocument,
    { variables, skip, throwOnError: true }
  )

  const coachingEngagementsData = useMemo(() => {
    if (!data?.talentCoachingEngagements) {
      return
    }

    const { nodes, totalCount } = data?.talentCoachingEngagements || {}

    return { talentCoachingEngagements: nodes, totalCount }
  }, [data])

  return {
    data: coachingEngagementsData,
    loading,
    error,
    ...rest
  }
}
