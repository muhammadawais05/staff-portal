import { gql } from '@apollo/client'

export const originalInvoiceItemFragment = gql`
  fragment OriginalInvoiceItemFragment on Invoice {
    amount
    listedAmount
    cleanOutstandingAmount
    description
    documentNumber
    id
    invoiceKind
    unconsolidated
    issueDate
    dueDate
    webResource {
      ...WebResourceFragment
    }
    subjectObject {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    talent {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    job {
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }
`
