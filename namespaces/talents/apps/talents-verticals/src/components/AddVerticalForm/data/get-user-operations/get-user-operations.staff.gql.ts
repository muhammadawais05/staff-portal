import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetUserOperationsDocument } from './get-user-operations.staff.gql.types'

export const GET_USER_OPERATIONS: typeof GetUserOperationsDocument = gql`
  query GetUserOperations {
    operations {
      createVertical {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetUserOperations = () => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetUserOperationsDocument
  )

  return {
    data: data?.operations,
    loading,
    error,
    ...restOptions
  }
}
