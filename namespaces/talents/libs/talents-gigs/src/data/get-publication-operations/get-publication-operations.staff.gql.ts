import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetPublicationOperationsDocument } from './get-publication-operations.staff.gql.types'

export default gql`
  query GetPublicationOperations {
    operations {
      createPublicationGig {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetPublicationOperations = () => {
  const { data, ...restOptions } = useQuery(GetPublicationOperationsDocument, {
    fetchPolicy: 'cache-first'
  })

  return {
    operations: data?.operations,
    ...restOptions
  }
}
