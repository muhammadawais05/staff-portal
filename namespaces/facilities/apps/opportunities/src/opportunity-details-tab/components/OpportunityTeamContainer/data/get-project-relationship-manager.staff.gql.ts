import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetProjectRelationshipManager($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        projectRelationshipManager {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
