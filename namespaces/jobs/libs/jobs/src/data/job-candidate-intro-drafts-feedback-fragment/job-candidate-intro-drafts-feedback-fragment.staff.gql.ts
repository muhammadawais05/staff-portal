import { gql } from '@staff-portal/data-layer-service'

export const JOB_CANDIDATE_INTRO_DRAFTS_FEEDBACK_FRAGMENT = gql`
  fragment JobCandidateIntroDraftsFeedbackFragment on Feedback {
    id
    comment
    reason {
      id
      name
    }
  }
`
