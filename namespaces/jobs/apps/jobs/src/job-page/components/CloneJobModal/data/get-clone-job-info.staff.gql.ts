import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetCloneJobInfo($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        workType
        skillLongShot
        startDate
        toptalProjects
        longshotReasons
        specialization {
          id
        }
        location {
          country {
            id
          }
          cityName
        }
        availableSpecializations {
          nodes {
            id
            title
          }
        }
      }
    }
    jobLongshotReasons
  }
`
