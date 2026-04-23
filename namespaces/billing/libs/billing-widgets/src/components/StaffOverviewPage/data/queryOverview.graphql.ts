import { gql } from '@apollo/client'

export const overviewInvoices = gql`
  query OverviewInvoices(
    $accessLevel: AccessLevelFilter!
    $sinceDate: String!
    $timesheetsSinceDate: Date
  ) {
    overview {
      invoicesOverview(
        filter: { accessLevel: $accessLevel, sinceDate: $sinceDate }
      ) {
        paid
        disputed
        overdue
        outstanding
      }
      invoicesDisputed: invoices(
        filter: { accessLevel: $accessLevel, status: "disputed" }
        order: { direction: DESC, field: LAST_STATUS_CHANGE_AT }
        pagination: { limit: 5, offset: 0 }
      ) {
        nodes {
          id
          subject {
            contact {
              webResource {
                ...WebResourceFragment
              }
            }
            netTerms
            webResource {
              ...WebResourceFragment
            }
          }
          job {
            webResource {
              ...WebResourceFragment
            }
          }
          dueDate
          issueDate
          amount
        }
      }
      invoicesOverdue: invoices(
        filter: { accessLevel: $accessLevel, status: "overdue" }
        order: { direction: ASC, field: LAST_STATUS_CHANGE_AT }
        pagination: { limit: 5, offset: 0 }
      ) {
        nodes {
          id
          subject {
            contact {
              webResource {
                ...WebResourceFragment
              }
            }
            netTerms
            webResource {
              ...WebResourceFragment
            }
          }
          job {
            webResource {
              ...WebResourceFragment
            }
          }
          dueDate
          issueDate
          amount
        }
      }
      purchaseOrdersExpiration: purchaseOrders(
        filter: { accessLevel: $accessLevel, type: "expiredAboveOneMonth" }
        order: { direction: ASC, field: EXPIRES_ON }
        pagination: { limit: 5, offset: 0 }
      ) {
        nodes {
          id
          client {
            webResource {
              ...WebResourceFragment
            }
          }
          expiryDate
          totalAmount
          invoicedAmount
          budgetSpent
          threshold
          webResource {
            ...WebResourceFragment
          }
        }
      }
      purchaseOrdersLimit: purchaseOrders(
        filter: { accessLevel: $accessLevel, type: "withAmount" }
        order: { direction: ASC, field: AMOUNT_LEFT }
        pagination: { limit: 5, offset: 0 }
      ) {
        nodes {
          id
          client {
            webResource {
              ...WebResourceFragment
            }
          }
          expiryDate
          totalAmount
          invoicedAmount
          budgetSpent
          threshold
          webResource {
            ...WebResourceFragment
          }
        }
      }
      timesheets(
        filter: {
          accessLevel: $accessLevel
          type: "overdue"
          sinceDate: $timesheetsSinceDate
        }
        order: { direction: ASC, field: DUE_DATE }
        pagination: { limit: 5, offset: 0 }
      ) {
        nodes {
          id
          dueDate
          client {
            webResource {
              ...WebResourceFragment
            }
          }
          job {
            webResource {
              ...WebResourceFragment
            }
          }
          talent {
            webResource {
              ...WebResourceFragment
            }
          }
          recruiter {
            ... on Staff {
              webResource {
                ...WebResourceFragment
                __typename
              }
            }
          }
        }
      }
    }
  }
`
