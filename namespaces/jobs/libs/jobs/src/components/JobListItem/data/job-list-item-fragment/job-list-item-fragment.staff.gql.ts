import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  PROBABILITY_TO_CONVERT_FRAGMENT,
  JOB_SKILL_SET_FRAGMENT,
  INDUSTRY_FRAGMENT,
  JOB_ENGAGEMENT_FRAGMENT
} from '../../../../data'

export const JOB_LIST_ITEM_FRAGMENT = gql`
  fragment JobListItemFragment on Job {
    id
    title
    jobType
    workType
    postedAt
    claimedAt
    invoiceNote
    commitment
    talentCount
    cumulativeStatus
    sendCandidateUrl
    searchCandidatesUrl
    searchApplicantsUrl
    searchRejectedTalentsUrl
    matcherCallScheduled
    hoursOverlapEnum
    hasPreferredHours
    preferHoursOverlapping
    rehire
    automatedAvailabilityRequests
    hiredCount
    status
    searchAllowed
    description

    engagements(filter: { state: CURRENT }) {
      nodes {
        ...JobEngagementFragment
      }
    }
    timeZonePreference {
      name
      value
    }
    client {
      id
      enterprise
      webResource {
        url
        text
      }
    }
    contacts {
      nodes {
        id
        fullName
      }
    }
    skillSets {
      totalCount
      nodes {
        ...JobSkillSetFragment
      }
    }
    webResource {
      url
      text
    }

    probabilityToConvert {
      ...ProbabilityToConvertFragment
    }

    operations {
      editJobInvoiceNote {
        ...OperationFragment
      }
      approveJob {
        ...OperationFragment
      }
    }
    estimatedValue
    estimatedRevenue
    industries {
      nodes {
        ...IndustryFragment
      }
    }

    isSpecializable
    specialization {
      id
      title
    }

    currentEngagement {
      id
      commitment
      currentCommitment {
        availability
      }
    }
  }

  ${PROBABILITY_TO_CONVERT_FRAGMENT}
  ${JOB_SKILL_SET_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${INDUSTRY_FRAGMENT}
  ${JOB_ENGAGEMENT_FRAGMENT}
`
