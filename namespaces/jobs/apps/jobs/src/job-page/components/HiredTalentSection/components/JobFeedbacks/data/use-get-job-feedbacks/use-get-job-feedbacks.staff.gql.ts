import { gql } from '@staff-portal/data-layer-service'
import { FEEDBACK_WITH_ANSWERS_FRAGMENT } from '@staff-portal/feedbacks'

export const GET_JOB_FEEDBACKS = gql`
  query GetJobFeedbacks($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        feedbacks {
          nodes {
            ...FeedbackWithAnswersFragment
          }
        }
      }
    }
  }

  ${FEEDBACK_WITH_ANSWERS_FRAGMENT}
`
