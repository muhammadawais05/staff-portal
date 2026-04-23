import { gql } from '@staff-portal/data-layer-service'
import { STAFF_USER_FRAGMENT } from '@staff-portal/staff'

export default gql`
  query GetAccountManager($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        accountManager {
          ...StaffUserFragment
        }
      }
    }
  }
  ${STAFF_USER_FRAGMENT}
`
