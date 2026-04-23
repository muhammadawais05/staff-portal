import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetFavoriteTalents($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        favoriteTalents(filter: { scope: ACTIVE }) {
          edges {
            appropriateSpecialization
            node {
              id
              fullName
              availabilityRequestMetadata {
                lowActivity
                pending
                prediction
                recentConfirmed
                recentRejected
              }
            }
          }
        }
      }
    }
  }
`
