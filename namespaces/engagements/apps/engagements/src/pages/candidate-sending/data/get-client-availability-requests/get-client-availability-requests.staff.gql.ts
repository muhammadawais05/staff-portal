import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetClientAvailabilityRequests($clientId: ID!, $talentId: ID) {
    node(id: $clientId) {
      ... on Client {
        id
        jobs(
          filter: { forTalentVertical: $talentId, statuses: [PENDING_ENGINEER] }
        ) {
          nodes {
            id
            title
          }
        }
      }
    }
  }
`
