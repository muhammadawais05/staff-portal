import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetTalentTabsCountersDocument } from './get-talent-tabs-counters.staff.gql.types'

export default gql`
  query GetTalentTabsCounters($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        sourcingRequests {
          totalCount
        }
        engagements {
          jobCounters {
            total
          }
        }
        activitiesAndNotes(
          filter: {}
          order: { field: OCCURRED_AT, direction: DESC }
          pagination: { offset: 0, limit: 1000 }
        ) {
          totalCount
        }
        infractions {
          totalCount
        }
      }
    }
  }
`

export const useGetTalentTabsCounters = (talentId: string) =>
  useGetNode(GetTalentTabsCountersDocument)(
    { talentId },
    { throwOnError: false }
  )
