import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetSalesClaimer($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        salesClaimer {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
