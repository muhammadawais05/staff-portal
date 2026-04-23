import { gql } from '@staff-portal/data-layer-service'

export const COMMITMENT_SURVEY_FRAGMENT = gql`
  fragment CommitmentSurveyFragment on DraftJobCommitmentSurvey {
    question
    options {
      description
      label
      value
    }
  }
`
