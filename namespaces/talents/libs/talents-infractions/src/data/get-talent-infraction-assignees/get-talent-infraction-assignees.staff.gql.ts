import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentInfractionAssigneesDocument } from './get-talent-infraction-assignees.staff.gql.types'

export const GET_TALENT_INFRACTION_ASSIGNEES: typeof GetTalentInfractionAssigneesDocument = gql`
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

export const useGetTalentInfractionAssignees = () => {
  const { data, error, loading } = useQuery(GET_TALENT_INFRACTION_ASSIGNEES, {
    throwOnError: true
  })

  return {
    data: data?.roles?.nodes,
    loading,
    error
  }
}
