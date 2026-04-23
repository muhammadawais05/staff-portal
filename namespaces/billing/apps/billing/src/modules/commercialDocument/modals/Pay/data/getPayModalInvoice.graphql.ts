import { gql } from '@apollo/client'

export default gql`
  query GetPayModalInvoice($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...InvoiceModalFragment
      }
    }
  }

  fragment InvoiceModalFragment on Invoice {
    cleanAmountToPay
    discountApplied
    discountedAmountToPay
    documentNumber
    expectedClearanceDateForNewPendingReceipt
    id
    invoiceKind
    ...InvoiceOperationsFragment
    status
    issueDate
    subjectObject {
      availablePrepaymentBalance
      billingNotes
      hierarchy {
        clients {
          nodes {
            ...ClientWithUnappliedCashFragment
          }
        }
      }
      billingOptions(filter: { scope: VERIFIED }) {
        nodes {
          ...BillingOptionFragment
        }
        totalCount
      }
      fullName
      id
      preferredBillingOption {
        ...BillingOptionFragment
      }
      unallocatedMemorandums {
        ...UnallocatedMemorandumNodesFragment
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }

  fragment ClientWithUnappliedCashFragment on Client {
    id
    _companyId
    fullName
    unappliedCashBalance
    unappliedCashEntries {
      nodes {
        id
        effectiveDate
        availableAmount
      }
    }
  }
`
