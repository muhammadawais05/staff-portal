import { gql } from '@staff-portal/data-layer-service'

export const ESTIMATED_LENGTH_SURVEY_FRAGMENT = gql`
  fragment EstimatedLengthSurveyFragment on DraftJobEstimatedLengthSurvey {
    question
    options {
      description
      label
      value
    }
  }
`
