import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT,
  TalentCoachingEngagementWithActivitiesFragment
} from '../talent-coaching-engagement-with-activities-fragment'
import { GetTalentCoachingEngagementDocument } from './get-talent-coaching-engagement.staff.gql.types'

export const GET_TALENT_COACHING_ENGAGEMENT = gql`
  query GetTalentCoachingEngagement(
    $id: ID!
    $loadDisputeOperations: Boolean!
  ) {
    node(id: $id) {
      ...TalentCoachingEngagementWithActivitiesFragment
    }
  }

  ${TALENT_COACHING_ENGAGEMENT_WITH_ACTIVITIES_FRAGMENT}
`

export const getTalentCoachingEngagementHook =
  (id: string, field: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetTalentCoachingEngagementDocument,
      {
        variables: { id, loadDisputeOperations: true }
      }
    )

    return {
      request,
      loading,
      data: data?.node ? getFieldFromResponse(data.node, field) : undefined,
      error: !data?.node ? error : undefined,
      called
    }
  }

const getFieldFromResponse = (
  node: TalentCoachingEngagementWithActivitiesFragment,
  field: string
) => {
  switch (field) {
    case 'coach':
      return node.coach?.id
    case 'status':
      return node.status
    default:
      return undefined
  }
}
