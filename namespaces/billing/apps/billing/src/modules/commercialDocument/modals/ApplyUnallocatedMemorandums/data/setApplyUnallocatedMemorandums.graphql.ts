import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import transferFragment from '../../../../__fragments__/transferFragment.graphql'

export default gql`
  mutation SetApplyUnallocatedMemorandumsToCommercialDocument(
    $input: ApplyUnallocatedMemorandumsToCommercialDocumentInput!
  ) {
    applyUnallocatedMemorandumsToCommercialDocument(input: $input) {
      notice
      success
      errors {
        code
        key
        message
      }
      commercialDocument {
        amount
        balanceDue
        creditedAmount
        debitedAmount
        id
        memorandums {
          nodes {
            allocated
            allocatedAt
            amount
            amountDue
            balance
            category {
              id
              name
            }
            depositCorrection
            description
            downloadHtmlUrl
            downloadPdfUrl
            id
            number
            portions {
              id
            }
          }
        }
        paidAmount
        paidAt
        status
        transfers {
          nodes {
            ...TransferFragment
          }
        }
        ... on Invoice {
          cleanAmountToPay
          discountedAmountToPay
          operations {
            applyUnallocatedMemorandumsToCommercialDocument {
              ...OperationItem
            }
            createTransferInvoice {
              ...OperationItem
            }
          }
        }
        ... on Payment {
          operations {
            applyUnallocatedMemorandumsToCommercialDocument {
              ...OperationItem
            }
            payPayment {
              ...OperationItem
            }
          }
          paymentMethod
        }
      }
    }
  }

  ${operationItemFragment}
  ${transferFragment}
`
