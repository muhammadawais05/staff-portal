import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetProjectSalesSpecialist($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        id
        projectSalesSpecialist {
          ...StaffUserFragment
        }
      }
    }
  }
  ${OPERATION_FRAGMENT}
`
