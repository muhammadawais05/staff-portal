import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetClientClaimer($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        claimer {
          ...StaffUserFragment
        }
      }
    }
  }

  ${STAFF_USER_FRAGMENT}
`
