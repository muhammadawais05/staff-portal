import { useMemo } from 'react'
import { RoleScope } from '@staff-portal/graphql/staff'
import {
  gql,
  useQuery,
  decodeEntityId,
  ApolloError
} from '@staff-portal/data-layer-service'

import { GetClaimersDocument } from './get-claimers.staff.gql.types'
import { CLAIMER_FRAGMENT, ClaimerFragment } from '../claimer-fragment'

export const GET_CLAIMERS: typeof GetClaimersDocument = gql`
  query GetClaimers($scope: RoleScope!) {
    roles(
      filter: { scope: $scope }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      nodes {
        ... on Staff {
          ...ClaimerFragment
        }
      }
    }
  }

  ${CLAIMER_FRAGMENT}
`

const mapClaimer = ({ id, fullName }: ClaimerFragment) => ({
  id: decodeEntityId(id).id,
  fullName
})

export const useGetClaimers = ({
  scope,
  onError
}: {
  scope: RoleScope
  onError: (error: ApolloError) => void
}) => {
  const { data, ...restOptions } = useQuery(GET_CLAIMERS, {
    variables: { scope },
    onError,
    fetchPolicy: 'cache-first'
  })

  const claimers = useMemo(() => data?.roles.nodes.map(mapClaimer), [data])

  return {
    ...restOptions,
    claimers
  }
}
