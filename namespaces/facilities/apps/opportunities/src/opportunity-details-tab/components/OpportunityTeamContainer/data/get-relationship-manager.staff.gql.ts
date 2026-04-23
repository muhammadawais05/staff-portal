import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetRelationshipManager($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        relationshipManager {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
