import { gql } from '@staff-portal/data-layer-service'

export const SOURCED_TALENT_FRAGMENT = gql`
  fragment SourcedTalentFragment on Talent {
    id
    fullName
    joinedAt
    type
    photo {
      thumb
    }
    webResource {
      url
    }
    sourcingStatus
    technicalStepsProgress {
      currentStep
      totalSteps
    }
    nextMeetingDate
  }
`
