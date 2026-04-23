import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { billingOptionFragment } from '../../../../__fragments__/billingOptionFragment.graphql'

export default gql`
  query GetInvoiceTaskCard($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        id
        status
        amount
        balanceDue
        createdOn
        description
        documentNumber
        discountedAmount
        dueDate
        invoiceKind
        duePeriod
        partiallyPaid
        discountApplied
        cleanOutstandingAmount
        operations {
          addMemorandumToCommercialDocument {
            ...OperationItem
          }
          createTransferInvoice {
            ...OperationItem
          }
        }
        subjectObject {
          id
          preferredBillingOption {
            ...BillingOptionFragment
          }
          claimer {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          matchers {
            nodes {
              id
              role {
                id
                fullName
                webResource {
                  ...WebResourceFragment
                }
              }
              vertical {
                id
                talentType
              }
            }
          }
          fullName
          webResource {
            ...WebResourceFragment
          }
        }
        consolidatedDocument {
          id
          ... on Invoice {
            webResource {
              ...WebResourceFragment
            }
          }
        }
        job {
          id
          currentInvestigation {
            id
            startedAt
          }
          hiredCount
          cumulativeStatus
          matcherCallScheduled
          talentCount
          status
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

  ${billingOptionFragment}
  ${operationItemFragment}
  ${webResourceFragment}
`
