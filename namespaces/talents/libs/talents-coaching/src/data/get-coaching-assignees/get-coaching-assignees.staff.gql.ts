import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetCoachingAssigneesDocument } from './get-coaching-assignees.staff.gql.types'

export const GET_COACHING_ASSIGNEES = gql`
  query GetCoachingAssignees {
    roles(
      filter: { scope: TALENT_COACHING_ENGAGEMENT_ASSIGNEES }
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

export const useGetCoachingAssignees = () => {
  const { data, loading, error } = useQuery(GetCoachingAssigneesDocument, {
    fetchPolicy: 'cache-first',
    throwOnError: true
  })

  return {
    assignees: data?.roles?.nodes ?? [],
    loading,
    error
  }
}
