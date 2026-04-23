import {
  ApolloError,
  gql,
  useQuery,
  BATCH_KEY
} from '@staff-portal/data-layer-service'

import {
  GetFlagsDocument,
  GetFlagsQueryVariables
} from './get-flags.staff.gql.types'

export const GET_FLAGS: typeof GetFlagsDocument = gql`
  query GetFlags($roleType: RoleType!) {
    flags(filter: { roleType: $roleType }) {
      nodes {
        ...FlagFragment
      }
    }
  }

  fragment FlagFragment on Flag {
    id
    title
  }
`

export const useGetFlags = ({
  roleType,
  onError,
  batchKey
}: {
  roleType: GetFlagsQueryVariables['roleType']
  onError?: (error: ApolloError) => void
  batchKey?: string
}) => {
  const { data, ...restOptions } = useQuery(GET_FLAGS, {
    variables: { roleType },
    onError,
    fetchPolicy: 'cache-first',
    context: { [BATCH_KEY]: batchKey }
  })

  return { ...restOptions, flags: data?.flags.nodes }
}
