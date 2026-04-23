import { gql, useQuery } from '@staff-portal/data-layer-service'

import { OperationFragmentDoc } from '../operation-fragment/operation-fragment.staff.gql.types'
import { GetUserQueryOperationDocument } from './get-user-query-operations.staff.gql.types'

export default gql`
  query GetUserQueryOperation {
    operations {
      createTalentQuizQuestion {
        ...OperationFragment
      }
      cloneTalentQuizQuestion {
        ...OperationFragment
      }
    }
  }

  ${OperationFragmentDoc}
`

export const useGetUserQueryOperations = () => {
  const { data, ...restOptions } = useQuery(GetUserQueryOperationDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.operations,
    ...restOptions
  }
}
