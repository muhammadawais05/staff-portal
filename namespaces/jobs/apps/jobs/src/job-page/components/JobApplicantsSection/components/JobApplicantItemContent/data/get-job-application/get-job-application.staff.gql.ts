import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import {
  TALENT_PARTNER_FRAGMENT,
  TALENT_ENGAGEMENT_RATES_FRAGMENT,
  TALENT_SKILL_SETS_FRAGMENT
} from '@staff-portal/talents'
import { JOB_POSITION_ANSWER_FRAGMENT } from '@staff-portal/jobs'

export default gql`
  query GetJobApplication($jobApplicationId: ID!, $jobId: ID!) {
    node(id: $jobApplicationId) {
      ...JobApplicationContentFragment
    }
  }

  fragment JobApplicationContentFragment on JobApplication {
    id
    approveUrl
    approveUrlTooltip
    job {
      id
      skillSets {
        nodes {
          id
          skill {
            id
          }
        }
      }
    }
    talent {
      id
      type
      fullName
      hourlyRate
      locationV2 {
        country {
          id
          name
        }
      }
      skillSets {
        ...TalentSkillSetsFragment
      }
      matchQualityMetrics(jobId: $jobId) {
        nodes {
          ...TalentMatchQualityFragment
        }
      }
      slackContacts: contacts(filter: { type: COMMUNITY_SLACK }) {
        nodes {
          id
          webResource {
            url
          }
        }
      }
      deltaWaitingDays
      lastClosedEngagementEndDate
      lastAvailabilityIncreaseDate
      photo {
        small
      }
      webResource {
        url
      }
      timeZone {
        ...TimeZoneFragment
      }
      ...TalentEngagementRatesFragment
      ...TalentPartnerFragment
    }
    talentPitch {
      pitchText
    }
    jobPositionAnswers {
      nodes {
        ...JobPositionAnswerFragment
      }
      totalCount
    }
    operations {
      rejectJobApplicant {
        ...OperationFragment
      }
      emailJobApplicant {
        ...OperationFragment
      }
    }
  }
  ${TALENT_ENGAGEMENT_RATES_FRAGMENT}
  ${TALENT_SKILL_SETS_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${TALENT_PARTNER_FRAGMENT}
  ${JOB_POSITION_ANSWER_FRAGMENT}
`
