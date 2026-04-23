import gql from 'graphql-tag'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetRefundClientCreditBalance($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        availablePrepaymentBalanceNullable
        fullName
        operations {
          refundClientCreditBalance {
            ...OperationItem
          }
        }
      }
    }
  }

  ${operationItemFragment}
`
