import { gql } from '@apollo/client'

export const invoiceToConsolidateListItemFragment = gql`
  fragment InvoiceToConsolidateListItemFragment on Invoice {
    amount
    listedAmount
    actionDueOn
    description
    longDescription
    statusComment
    documentNumber
    id
    invoiceKind
    unconsolidated
    issueDate
    dueDate
    creditedAmount
    status
    paidAt
    processingDate
    hasPendingCharges
    range {
      from
      till
    }
    reason {
      ... on Engagement {
        id
        # Temporary rename
        # https://github.com/toptal/platform/pull/45734
        placementFees: placementFeesNullable {
          totalCount
        }
      }
    }
    webResource {
      ...WebResourceFragment
    }
    subjectObject {
      id
      webResource {
        ...WebResourceFragment
      }
      preferredBillingOption {
        discountable
      }
    }
    originalBillingCycle {
      endDate
      startDate
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
