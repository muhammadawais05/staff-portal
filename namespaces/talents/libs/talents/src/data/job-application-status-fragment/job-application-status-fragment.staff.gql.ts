import { gql } from '@staff-portal/data-layer-service'

export const JOB_APPLICATION_STATUS_FRAGMENT = gql`
  fragment JobApplicationStatusFragment on TalentJobApplicationStatus {
    status
    relatedObject {
      ... on JobRecommendation {
        jobRecommentationStatus: status
        job {
          id
        }
      }
      ... on JobApplication {
        id
        jobApplicationStatus: status
        job {
          id
        }
      }
      ... on Engagement {
        id
        engagementStatus: status
        engagementJob: job {
          id
        }
      }
      ... on AvailabilityRequest {
        id
        availabilityRequestStatus: status
        job {
          id
        }
      }
    }
    ... on WebResource {
      webResource {
        text
        url
      }
    }
  }
`
