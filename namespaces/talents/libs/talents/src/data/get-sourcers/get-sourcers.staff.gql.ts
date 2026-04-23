import { RoleScope } from '@staff-portal/graphql/staff'
import { ApolloError, gql, useQuery } from '@staff-portal/data-layer-service'

import { GetSourcersDocument } from './get-sourcers.staff.gql.types'

export const GET_SOURCERS: typeof GetSourcersDocument = gql`
  query GetSourcers($scope: RoleScope!) {
    roles(
      filter: { scope: $scope }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        ...SourcerFragment
      }
    }
  }

  fragment SourcerFragment on Role {
    id
    fullName
  }
`

export const useGetSourcers = ({
  scope,
  onError
}: {
  scope: RoleScope
  onError?: (error: ApolloError) => void
}) => {
  const { data, ...queryResult } = useQuery(GET_SOURCERS, {
    variables: { scope },
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    ...queryResult,
    sourcers: data?.roles.nodes
  }
}
