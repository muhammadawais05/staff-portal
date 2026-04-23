import {
  gql,
  filterUnauthorizedErrors,
  useQuery,
  BATCH
} from '@staff-portal/data-layer-service'

import { GetTalentTabsPermissionsDocument } from './get-talent-tabs-permissions.staff.gql.types'

export const GET_TALENT_TABS_PERMISSIONS = gql`
  query GetTalentTabsPermissions($talentId: ID!) {
    viewer {
      permits {
        canViewEngagements
        canViewCommunityLeaders
      }
    }
    node(id: $talentId) {
      ... on Talent {
        id
        talentPartner {
          id
        }
        displayPerformanceProfileTab
        jobApplications(pagination: { offset: 0, limit: 1 }) {
          nodes {
            id
          }
        }
        topShieldApplication {
          id
        }
      }
    }
  }
`

export const useGetTalentTabsPermissions = (talentId: string) => {
  const { data, ...restOptions } = useQuery(GetTalentTabsPermissionsDocument, {
    variables: { talentId },
    throwOnError: true,
    errorFilters: [filterUnauthorizedErrors],
    context: { [BATCH]: false }
  })

  return {
    ...restOptions,
    userPermissions: data?.viewer.permits,
    tabsPermissions: data?.node
  }
}
