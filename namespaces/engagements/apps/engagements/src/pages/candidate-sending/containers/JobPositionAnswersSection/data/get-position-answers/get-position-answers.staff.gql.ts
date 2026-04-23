import { gql } from '@staff-portal/data-layer-service'
import { JOB_POSITION_ANSWER_FRAGMENT } from '@staff-portal/jobs'

export default gql`
  query GetPositionAnswers($id: ID!) {
    node(id: $id) {
      ... on JobApplication {
        id
        applicationComment
        jobApplicationJobPositionAnswers: jobPositionAnswers {
          nodes {
            ...JobPositionAnswerFragment
          }
        }
      }
      ... on AvailabilityRequest {
        id
        comment
        availabilityRequestJobPositionAnswers: jobPositionAnswers {
          nodes {
            ...JobPositionAnswerFragment
          }
        }
      }
    }
  }
  ${JOB_POSITION_ANSWER_FRAGMENT}
`
