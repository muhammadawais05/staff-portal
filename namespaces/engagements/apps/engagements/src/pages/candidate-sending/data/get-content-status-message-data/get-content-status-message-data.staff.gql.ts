import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetContentStatusMessageData($clientId: ID!) {
    minimumClientCreditRequired
    node(id: $clientId) {
      ... on Client {
        ...GetContentStatusMessageDataFragment
      }
    }
  }

  fragment GetContentStatusMessageDataFragment on Client {
    id
    hasUnpaidDepositInvoices
    availablePrepaymentBalanceNullable
  }
`
