import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetJobSourcingRequestPositionDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        sourcingRequest {
          id
          positions
          positionsComment
          extraInformation
          extraInformationComment
          sellingPoints
          mustHaveSkillsComment
          niceToHaveSkillsComment
          jobStartDeadline
          jobStartDeadlineComment
          furtherQualificationInterviews
          furtherQualificationInterviewsComment
          skillSets {
            totalCount
            nodes {
              id
              rating
              main
              niceToHave
              skill {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`
