import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentInfractionAssigneesDocument } from './get-infraction-assignees.staff.gql.types'

export const GET_INFRACTION_ASSIGNEES: typeof GetTalentInfractionAssigneesDocument = gql`
  query GetTalentInfractionAssignees {
    roles(
      filter: { scope: TALENT_INFRACTION_ASSIGNEES }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        ... on Staff {
          id
          fullName
        }
      }
    }
  }
`

export const useGetInfractionAssignees = () => {
  const { data, error, loading } = useQuery(GET_INFRACTION_ASSIGNEES)

  return {
    data: data?.roles?.nodes,
    loading,
    error
  }
}
