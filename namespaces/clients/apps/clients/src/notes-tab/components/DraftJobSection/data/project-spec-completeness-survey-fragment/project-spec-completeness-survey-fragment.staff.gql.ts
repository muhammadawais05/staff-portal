import { gql } from '@staff-portal/data-layer-service'

export const PROJECT_SPEC_COMPLETENESS_SURVEY_FRAGMENT = gql`
  fragment ProjectSpecCompletenessSurveyFragment on DraftJobProjectSpecCompletenessSurvey {
    question
    options {
      label
      value
    }
  }
`
