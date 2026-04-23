import { gql } from '@apollo/client'

import { operationItemFragment } from './operationItemFragment.graphql'

export const paymentOperationsFragment = gql`
  fragment PaymentOperationsFragment on Payment {
    operations {
      addDocumentNote {
        ...OperationItem
      }
      addMemorandumToCommercialDocument {
        ...OperationItem
      }
      applyUnallocatedMemorandumsToCommercialDocument {
        ...OperationItem
      }
      cancelPayment {
        ...OperationItem
      }
      convertPaymentIntoCreditMemorandum {
        ...OperationItem
      }
      disputeCommercialDocument {
        ...OperationItem
      }
      editDocumentNote {
        ...OperationItem
      }
      payPayment {
        ...OperationItem
      }
      resolveDisputeOfCommercialDocument {
        ...OperationItem
      }
      updateCommercialDocumentDueDate {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
