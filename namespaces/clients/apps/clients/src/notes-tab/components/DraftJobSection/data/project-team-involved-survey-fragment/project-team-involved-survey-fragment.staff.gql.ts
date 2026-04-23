import { gql } from '@staff-portal/data-layer-service'

export const PROJECT_TEAM_INVOLVED_SURVEY_FRAGMENT = gql`
  fragment ProjectTeamInvolvedSurveyFragment on DraftJobProjectTeamInvolvedSurvey {
    question
    options {
      label
      value
    }
  }
`
