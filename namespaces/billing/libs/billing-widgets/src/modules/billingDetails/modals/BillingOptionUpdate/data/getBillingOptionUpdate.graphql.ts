import gql from 'graphql-tag'

import { billingOptionFragment } from '../../../../__fragments__/billingOptionFragment.graphql'

export default gql`
  query GetBillingOptionUpdate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Client {
        id
        billingOptions(filter: { scope: ALL }) {
          nodes {
            ...BillingOptionFragment
          }
        }
      }
    }
  }

  ${billingOptionFragment}
`
