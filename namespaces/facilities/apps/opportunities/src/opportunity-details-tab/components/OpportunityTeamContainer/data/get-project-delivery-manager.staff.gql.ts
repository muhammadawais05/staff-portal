import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetProjectDeliveryManager($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        projectDeliveryManager {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
