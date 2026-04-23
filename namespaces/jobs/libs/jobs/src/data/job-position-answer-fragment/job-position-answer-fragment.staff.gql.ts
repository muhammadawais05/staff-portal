import { gql } from '@staff-portal/data-layer-service'

export const JOB_POSITION_ANSWER_FRAGMENT = gql`
  fragment JobPositionAnswerFragment on JobPositionAnswer {
    id
    jobPositionQuestion {
      id
      template {
        id
        slug
      }
      updatedAt
    }
    value
    jobPositionQuestionFullRender
    updatedAt
    talent {
      id
      mainBookingPage {
        id
        slug
      }
    }
  }
`
