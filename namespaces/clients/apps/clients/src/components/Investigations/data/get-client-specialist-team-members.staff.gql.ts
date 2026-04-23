import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetClientSpecialistTeamMembersDocument } from './get-client-specialist-team-members.staff.gql.types'

export default gql`
  query GetClientSpecialistTeamMembers {
    roles(filter: { scope: CLIENT_SPECIALIST_TEAM_MEMBERS }) {
      nodes {
        ...InvestigationsStaffSelectOptionFragment
      }
    }
  }

  fragment InvestigationsStaffSelectOptionFragment on Role {
    id
    fullName
  }
`

export const useGetClientSpecialistTeamMembers = () => {
  const { data, ...queryResult } = useQuery(
    GetClientSpecialistTeamMembersDocument,
    { throwOnError: true }
  )

  return {
    ...queryResult,
    data: data?.roles.nodes
  }
}
