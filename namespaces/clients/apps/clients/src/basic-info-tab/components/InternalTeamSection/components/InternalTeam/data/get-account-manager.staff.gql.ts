import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetAccountManager($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        accountManager {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
