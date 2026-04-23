import { gql } from '@apollo/client'

import { operationItemFragment } from './operationItemFragment.graphql'

export const memorandumOperationsFragment = gql`
  fragment MemorandumOperationsFragment on Memorandum {
    operations {
      revertInvoicePrepayments {
        ...OperationItem
      }
      revertCommercialDocumentMemorandum {
        ...OperationItem
      }
      revertRoleMemorandum {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
