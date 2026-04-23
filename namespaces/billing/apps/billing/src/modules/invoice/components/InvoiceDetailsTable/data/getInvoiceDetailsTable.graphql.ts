import { gql } from '@apollo/client'

export default gql`
  query GetInvoiceDetailsTable($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        ...InvoiceDetailsPurchaseOrderFragment
        actionDueOn
        cleanOutstandingAmount
        consolidatedInvoice {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        consolidatedDocument {
          id
        }
        createdOn
        description
        discountApplied
        discountedAmount
        documentNote
        documentNumber
        downloadHtmlUrl
        downloadPdfUrl
        dueDate
        duePeriod
        issueDate
        gid
        originalAmount
        partiallyPaid
        status
        talent {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  fragment InvoiceDetailsPurchaseOrderFragment on Invoice {
    amountWithCorrections
    balanceDue
    exceedsPurchaseOrderBalance
    id
    invoiceKind
    job {
      id
      currentInvestigation {
        startedAt
      }
      hiredCount
      cumulativeStatus
      matcherCallScheduled
      nextPurchaseOrder {
        ...NextPurchaseOrderFragment
      }
      purchaseOrder {
        ...NextPurchaseOrderFragment
      }
      talentCount
      status
      webResource {
        ...WebResourceFragment
      }
    }
    operations {
      assignPurchaseOrder {
        ...OperationItem
      }
      assignPurchaseOrderLine {
        ...OperationItem
      }
    }
    purchaseOrder {
      ...PurchaseOrderFragment
    }
    purchaseOrderLine {
      ...PurchaseOrderLineFragmentForInvoice
    }
    reason {
      ... on Engagement {
        ...EngagementReasonFragment
      }
      ... on Job {
        ...JobReasonFragment
      }
    }
    subjectObject {
      id
      preferredBillingOption {
        ...BillingOptionFragment
      }
      financeTeamMember {
        webResource {
          ...WebResourceFragment
        }
      }
      purchaseOrdersNullable {
        nodes {
          ...PurchaseOrderFragment
        }
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }

  fragment NextPurchaseOrderFragment on PurchaseOrder {
    id
    poNumber
  }

  fragment PurchaseOrderLineFragmentForInvoice on PurchaseOrderLine {
    id
    poLineNumber
    budgetLeft
    client {
      fullName
    }
    webResource {
      ...WebResourceFragment
    }
    purchaseOrder {
      id
      poNumber
      budgetLeft
      webResource {
        ...WebResourceFragment
      }
    }
  }

  fragment EngagementReasonFragment on Engagement {
    id
    # nextPurchaseOrder does not exist on Engagement, only on Job
    # https://toptal-core.atlassian.net/browse/ROGUE-1236
    purchaseOrder {
      ...NextPurchaseOrderFragment
    }
  }

  fragment JobReasonFragment on Job {
    id
    nextPurchaseOrder {
      ...NextPurchaseOrderFragment
    }
    purchaseOrder {
      ...NextPurchaseOrderFragment
    }
  }
`
