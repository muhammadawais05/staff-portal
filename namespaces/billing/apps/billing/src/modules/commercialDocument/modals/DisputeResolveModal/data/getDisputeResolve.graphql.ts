import { gql } from '@apollo/client'

export default gql`
  query GetDisputeResolve($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...GetDisputeResolveInvoice
      }
      ... on Payment {
        ...GetDisputeResolvePayment
      }
    }
  }

  fragment GetDisputeResolveInvoice on Invoice {
    id
    documentNumber
  }

  fragment GetDisputeResolvePayment on Payment {
    id
    documentNumber
  }
`
