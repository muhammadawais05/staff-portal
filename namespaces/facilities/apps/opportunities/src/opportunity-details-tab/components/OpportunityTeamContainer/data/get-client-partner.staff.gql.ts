import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetClientPartner($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        clientPartner {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
