import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetClientEnterpriseSalesExecutive($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        enterpriseSalesExecutive {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
