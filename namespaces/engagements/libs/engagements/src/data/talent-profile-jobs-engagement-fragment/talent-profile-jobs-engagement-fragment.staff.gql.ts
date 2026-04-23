import { gql } from '@staff-portal/data-layer-service'

import { ENGAGEMENT_DETAILED_STATUS_FRAGMENT } from '../engagement-detailed-status-fragment'

export const TALENT_PROFILE_JOBS_ENGAGEMENT_FRAGMENT = gql`
  fragment TalentProfileJobsEngagementFragment on Engagement {
    id

    ...EngagementDetailedStatusFragment

    commitment
    currentCommitment {
      availability
    }

    postponedPerformedAction {
      comment
    }
    statusFeedback {
      id
      comment
      reason {
        id
        name
      }
    }
    client {
      id
      fullName
      enterprise
      photo {
        thumb
      }
      webResource {
        text
        url
      }
    }
    job {
      id
      webResource {
        text
        url
      }
      claimer {
        id
        webResource {
          text
          url
        }
      }
      claimerHandoff {
        replacement {
          id
          webResource {
            text
            url
          }
        }
      }
    }
    currentInterviewLock {
      id
      type
    }
  }
  ${ENGAGEMENT_DETAILED_STATUS_FRAGMENT}
`
