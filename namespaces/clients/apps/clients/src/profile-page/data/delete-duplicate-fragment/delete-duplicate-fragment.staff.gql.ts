import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const DELETE_DUPLICATE_FRAGMENT = gql`
  fragment DeleteDuplicateFragment on Client {
    operations {
      deleteDuplicateClient {
        ...OperationFragment
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
