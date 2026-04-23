import { gql } from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetAddActivityModalClientData($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        contact {
          ...RoleOrClientFragment
        }
        representatives(order: { field: CURRENT_SIGN_IN_AT, direction: DESC }) {
          nodes {
            ...RoleOrClientFragment
            currentSignInAt
          }
        }
      }
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`
