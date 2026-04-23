import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetUserOperationDocument } from './get-user-operations.staff.gql.types'

export const GET_USER_OPERATIONS: typeof GetUserOperationDocument = gql`
  query GetUserOperation {
    operations {
      createTalent {
        callable
        messages
      }
    }
  }
`

const useGetUserOperations = () => {
  const { data, error, loading, ...restOptions } = useQuery(GET_USER_OPERATIONS)

  return {
    data: data?.operations,
    loading,
    error,
    ...restOptions
  }
}

export { useGetUserOperations }
