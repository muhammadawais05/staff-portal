import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export const RATE_CHANGE_REQUEST_FRAGMENT = gql`
  fragment RateChangeRequestFragment on RateChangeRequest {
    id
    createdAt
    claimedAt
    claimerComment
    currentRate
    desiredRate
    outcomeRate
    requestTypeEnumValue
    status
    talentComment
    answers {
      nodes {
        ...RateChangeRequestAnswer
      }
    }
    engagement {
      ...RateChangeRequestEngagement
    }
    operations {
      completeRateChangeRequest {
        ...OperationFragment
      }
    }
    claimer {
      id
      ...WebResourceFragment
    }
    talent {
      ...RateChangeRequestTalent
    }
  }

  fragment RateChangeRequestAnswer on RateChangeRequestAnswer {
    answer
    comment
    question
  }

  fragment RateChangeRequestEngagement on Engagement {
    id
    startDate
    commitment
    companyHourlyRate
    currentCommitment {
      adjustedCompanyRate {
        hourlyHint {
          value
        }
      }
    }
    job {
      client {
        fullName
        relationshipManager {
          fullName
        }
        accountManager {
          fullName
        }
        ...WebResourceFragment
      }
      skillSets {
        nodes {
          main
          skill {
            name
          }
        }
      }
    }
    ...WebResourceFragment
  }

  fragment RateChangeRequestTalent on Talent {
    id
    type
    roleTitle
    fullName
    cumulativeStatus
    newcomer
    topShield
    email
    allocatedHoursAvailability(upcoming: true)
    allocatedHoursAvailabilityIncludingEndingEngagements: allocatedHoursAvailability(
      upcoming: false
    )
    availableHours(upcoming: true)
    availableHoursIncludingEndingEngagements: availableHours(upcoming: false)
    allocatedHours
    timeZone {
      name
      value
    }
    supplyHealthModelData {
      priority
      snapshotAt
    }
    locationV2 {
      countryName
      cityName
    }
    investigations {
      nodes {
        id
        startedAt
        resolvedAt
      }
    }
    specializationApplications(filter: { statuses: [PENDING, APPROVED] }) {
      nodes {
        id
        status
        specialization {
          id
          title
        }
      }
    }
    rateRecommendation {
      meanHour
      meanWeek
      quantity
    }

    skillSets {
      nodes {
        id
        rating
        connections {
          totalCount
        }
        skill {
          id
          name
        }
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

    ...WebResourceFragment
  }

  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
