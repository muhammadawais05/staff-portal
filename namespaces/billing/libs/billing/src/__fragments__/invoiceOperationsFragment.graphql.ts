import { gql } from '@apollo/client'

import { operationItemFragment } from './operationItemFragment.graphql'

export const invoiceOperationsFragment = gql`
  fragment InvoiceOperationsFragment on Invoice {
    operations {
      addDocumentNote {
        ...OperationItem
      }
      addMemorandumToCommercialDocument {
        ...OperationItem
      }
      applyPrepayments {
        ...OperationItem
      }
      applyPromotions {
        ...OperationItem
      }
      applyUnallocatedMemorandumsToCommercialDocument {
        ...OperationItem
      }
      assignPurchaseOrder {
        ...OperationItem
      }
      createTransferInvoice {
        ...OperationItem
      }
      disputeTalentPayments {
        ...OperationItem
      }
      editDocumentNote {
        ...OperationItem
      }
      collectBadDebtInvoice {
        ...OperationItem
      }
      recordBadDebt {
        ...OperationItem
      }
      disputeCommercialDocument {
        ...OperationItem
      }
      resolveDisputeOfCommercialDocument {
        ...OperationItem
      }
      unconsolidate {
        ...OperationItem
      }
      updateDispute {
        ...OperationItem
      }
      updateIssueDate {
        ...OperationItem
      }
      updateCommercialDocumentDueDate {
        ...OperationItem
      }
      writeOff {
        ...OperationItem
      }
    }
  }

  ${operationItemFragment}
`
