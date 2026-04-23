import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import {
  ROLE_OR_CLIENT_FRAGMENT,
  WEB_RESOURCE_FRAGMENT
} from '@staff-portal/facilities'
import { PROBABILITY_TO_CONVERT_FRAGMENT } from '@staff-portal/jobs'

const JOB_APPLICATIONS_FRAGMENT = gql`
  fragment JobApplicationsFragment on Job {
    id
    applications(filter: { statuses: [PENDING] }) {
      totalCount
    }
  }
`

const JOB_ASSIGNED_FRAGMENT = gql`
  fragment JobAssignedFragment on Job {
    id
    assigned: engagements(filter: { state: ASSIGNED_TALENT }) {
      totalCount
    }
  }
`

const JOB_BREAKS_FRAGMENT = gql`
  fragment JobBreaksFragment on Job {
    id
    breaks: engagements {
      nodes {
        id
        engagementBreaks(
          filter: { statuses: [SCHEDULED] }
          pagination: { offset: 0, limit: 1 }
          order: { direction: DESC, field: START_DATE }
        ) {
          nodes {
            id
            startDate
            endDate
          }
        }
      }
    }
  }
`

const JOB_CANDIDATES_FRAGMENT = gql`
  fragment JobCandidatesFragment on Job {
    id
    candidates: engagements(filter: { state: CANDIDATES }) {
      totalCount
    }
  }
`

const CURRENT_ENGAGEMENT_FRAGMENT = gql`
  fragment CurrentEngagementFragment on Job {
    id
    currentEngagement: engagements(
      filter: { state: CURRENT }
      pagination: { offset: 0, limit: 1 }
    ) {
      nodes {
        id
        startDate
        endDate
        accessibleBillingCycles: billingCycles(filter: { state: ACCESSIBLE }) {
          totalCount
        }
        talent {
          id
        }
        clientEmailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
        talentEmailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
      }
    }
  }
`

export const JOB_FRAGMENT = gql`
  fragment JobFragment on Job {
    id
    title
    availabilityRequests {
      totalCount
    }
    claimerOrHandoff {
      ...RoleOrClientFragment
    }
    client {
      claimer {
        id
        ...WebResourceFragment
      }
      ...RoleOrClientFragment
    }
    commitment
    cumulativeStatus
    currentInvestigation {
      id
      startedAt
    }
    historyLink {
      url
    }
    description
    engagementEndedFeedbackReason {
      id
      name
    }
    estimatedLength
    hiredCount
    jobType
    matcherCallScheduled
    postedAt
    searchCandidatesUrl
    semiMonthlyBilling
    originalJob {
      id
      webResource {
        text
        url
      }
    }
    probabilityToConvert {
      ...ProbabilityToConvertFragment
    }
    estimatedValue
    estimatedRevenue
    sendCandidateUrl
    skillSets {
      totalCount
    }
    specialization {
      id
      title
    }
    startDate
    status
    talentCount
    timeZonePreference {
      ...TimeZoneFragment
    }
    hasPreferredHours
    hoursOverlap
    totalHours
    visibleAt
    ...JobApplicationsFragment
    ...JobAssignedFragment
    ...JobBreaksFragment
    ...JobCandidatesFragment
    ...CurrentEngagementFragment
    webResource {
      url
      text
    }
    invoiceNote
  }

  ${JOB_APPLICATIONS_FRAGMENT}
  ${JOB_ASSIGNED_FRAGMENT}
  ${JOB_BREAKS_FRAGMENT}
  ${JOB_CANDIDATES_FRAGMENT}
  ${CURRENT_ENGAGEMENT_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
  ${TIME_ZONE_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${PROBABILITY_TO_CONVERT_FRAGMENT}
`
