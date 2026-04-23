import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { billingOptionFragment } from './billingOptionFragment.graphql'

export const invoiceListItemFragment = gql`
  fragment InvoiceListItemFragment on Invoice {
    amount
    listedAmount
    actionDueOn
    cleanOutstandingAmount
    description
    longDescription
    consolidatedDocument {
      id
    }
    discountApplied
    discountedAmount
    statusComment
    documentNumber
    id
    invoiceKind
    unconsolidated
    issueDate
    dueDate
    creditedAmount
    status
    paidAmount
    paidAt
    processingDate
    partiallyPaid
    hasPendingCharges
    operations {
      createTransferInvoice {
        ...OperationItem
      }
    }
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
        ...BillingOptionFragment
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

  ${webResourceFragment}
  ${billingOptionFragment}
  ${operationItemFragment}
`
