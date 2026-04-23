import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetBetaStaffMembersListDocument } from './get-beta-staff-members-list.staff.gql.types'

export const GET_STAFF_MEMBERS_LIST = gql`
  query GetBetaStaffMembersList {
    roles(filter: { scope: ALL }) {
      nodes {
        ...BetaStaffMemberFragment
      }
      totalCount
    }
  }

  fragment BetaStaffMemberFragment on Staff {
    id
    fullName
    lastVisitedDate
    teams {
      nodes {
        id
        name
      }
    }
    staffPortalBetaEnabled
    staffPortalEarlyAdopter
  }
`

export const useGetBetaStaffMembersList = () => {
  const { data, loading, error } = useQuery(GetBetaStaffMembersListDocument)

  return { data: data?.roles, loading, error }
}
