import { TalentEngagementScope } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetAssignedTalentEngagementsDocument } from './get-talent-engagements.staff.gql.types'

export const GET_ASSIGNED_TALENT_ENGAGEMENTS: typeof GetAssignedTalentEngagementsDocument = gql`
  query GetAssignedTalentEngagements(
    $roleId: ID!
    $filter: TalentEngagementFilter!
  ) {
    node(id: $roleId) {
      ... on Talent {
        id
        engagements(filter: $filter) {
          nodes {
            id
            webResource {
              text
            }
          }
        }
      }
    }
  }
`

export const useGetTalentEngagements = (roleId?: string) => {
  const { data, error, loading } = useQuery(GET_ASSIGNED_TALENT_ENGAGEMENTS, {
    skip: !roleId,
    variables: {
      roleId: roleId ?? '',
      filter: {
        scopes: [TalentEngagementScope.ASSIGNED]
      }
    }
  })

  return {
    data: data?.node?.engagements?.nodes,
    loading,
    error
  }
}
