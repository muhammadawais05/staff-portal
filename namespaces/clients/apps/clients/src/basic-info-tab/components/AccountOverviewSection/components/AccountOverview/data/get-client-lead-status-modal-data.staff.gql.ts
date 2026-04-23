import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientLeadStatusModalData($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        enterpriseLeadStatus
        enterpriseFollowUpStatus
      }
    }
    clientEnterpriseFollowUpStatuses
    clientEnterpriseLeadStatuses
  }
`
