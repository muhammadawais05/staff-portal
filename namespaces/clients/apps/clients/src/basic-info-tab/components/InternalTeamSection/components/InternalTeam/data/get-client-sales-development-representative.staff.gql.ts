import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetClientSalesDevelopmentRepresentative($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        salesDevelopmentRepresentative {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
