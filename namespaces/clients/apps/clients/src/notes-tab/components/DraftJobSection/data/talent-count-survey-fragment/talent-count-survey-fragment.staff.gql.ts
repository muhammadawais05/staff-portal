import { gql } from '@staff-portal/data-layer-service'

export const TALENT_COUNT_SURVEY_FRAGMENT = gql`
  fragment TalentCountSurveyFragment on DraftJobTalentCountSurvey {
    question
    options {
      label
      value
    }
  }
`
