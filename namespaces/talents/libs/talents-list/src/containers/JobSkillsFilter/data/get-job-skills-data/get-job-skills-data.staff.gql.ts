import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSkillsData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        webResource {
          text
          url
        }
        skillSets {
          nodes {
            id
            main
            rating
            skill {
              id
              name
            }
          }
        }
      }
    }
  }
`
