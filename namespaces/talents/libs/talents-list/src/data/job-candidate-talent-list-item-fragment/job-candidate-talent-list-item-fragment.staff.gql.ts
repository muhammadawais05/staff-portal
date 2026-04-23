import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const JOB_CANDIDATE_TALENT_LIST_ITEM_FRAGMENT = gql`
  fragment JobCandidateTalentListItemFragment on TalentJobEdge {
    previousInterviewsResult
    interestStatus
    notInterestedReason
    jobIssues {
      status
      failedMetrics {
        message
        name
        status
      }
    }
    jobScore {
      bestMatchScore
      bestMatchScoreRank
      totalRanked
    }
    defaultClientRates {
      hourlyRate
      weeklyRatePartTime
      weeklyRateFullTime
    }
    jobApplicationStatus {
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
    operations {
      createTalentAvailabilityRequest {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
