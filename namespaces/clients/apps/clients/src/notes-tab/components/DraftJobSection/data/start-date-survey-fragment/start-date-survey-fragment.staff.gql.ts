import { gql } from '@staff-portal/data-layer-service'

export const START_DATE_SURVEY_FRAGMENT = gql`
  fragment StartDateSurveyFragment on DraftJobStartDateSurvey {
    question
    options {
      description
      label
      value
    }
  }
`
