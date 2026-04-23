import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetSdr($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        sdr {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
