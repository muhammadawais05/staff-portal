import { gql } from '@staff-portal/data-layer-service'

export const CALLABLE_CLIENT_FRAGMENT = gql`
  fragment CallableClientFragment on Client {
    id
    fullName
    contact {
      id
      fullName
      contacts {
        nodes {
          ...CallableClientContactFragment
        }
      }
    }
  }

  fragment CallableClientContactFragment on Contact {
    category
    id
    note
    primary
    type
    value
    external
  }
`
