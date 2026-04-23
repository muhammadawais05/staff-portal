import { gql } from '@apollo/client'

export const InvoiceNotification = gql`
  fragment InvoiceNotificationFragment on InvoiceNotificationStatus {
    email
    status
    description
  }
`

export const PaymentNotification = gql`
  fragment PaymentNotificationFragment on PaymentNotificationStatus {
    email
    status
    description
  }
`

export default gql`
  query GetNotification($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
      id
      monitoringStartDate
      notificationSentAt
      notifications {
        nodes {
          ...InvoiceNotificationFragment
        }
        unsentReasonKey
        sentAt
      }
    }
    ... on Payment {
      id
      monitoringStartDate
      notificationSentAt
      notifications {
        nodes {
          ...PaymentNotificationFragment
        }
        sentAt
      }
    }
    }

    ${PaymentNotification}
  ${InvoiceNotification}
  }

`
