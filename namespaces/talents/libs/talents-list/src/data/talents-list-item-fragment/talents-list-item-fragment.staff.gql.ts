import { gql } from '@staff-portal/data-layer-service'
import { ROLE_FLAG_FRAGMENT } from '@staff-portal/role-flags'
import { UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT } from '@staff-portal/facilities'
import { TALENT_PROFILE_INDUSTRY_SET_FRAGMENT } from '@staff-portal/talents'

export const TALENTS_LIST_ITEM_FRAGMENT = gql`
  fragment TalentsListItemFragment on Talent {
    id
    roleFlags {
      nodes {
        ...RoleFlagFragment
      }
    }
    fullName
    photo {
      small
    }
    webResource {
      url
    }
    resumeUrl
    suspended
    sendToJobUrl
    cumulativeStatus
    newcomer
    topShield
    associatedRoles(filter: { roleType: TALENT }) {
      nodes {
        ...TalentAvailabilityFragment
      }
    }
    talentPartner {
      id
      webResource {
        text
        url
      }
    }
    cityDescription
    locationV2 {
      countryName
    }
    timeZone {
      name
    }
    currentSignInAt
    currentSignInIp
    ipLocation: ipLocationV2 {
      cityName
      countryName
    }
    lastVisitedDate
    activatedAt
    updatedAt
    joinedAt
    deltaWaitingDays
    lastClosedEngagementEndDate
    lastAvailabilityIncreaseDate
    ofacStatus
    ofacStatusComment
    hourlyRate
    defaultClientRates {
      hourlyRate
      weeklyRateFullTime
      weeklyRatePartTime
    }
    investigations {
      nodes {
        id
        startedAt
        resolvedAt
      }
    }
    currentInterviews {
      ...TalentsListCurrentInterviewsFragment
    }
    vertical {
      id
      specializations {
        totalCount
      }
    }
    specializationApplications(filter: { statuses: [PENDING, APPROVED] }) {
      nodes {
        ... on SpecializationApplication {
          id
          status
          specialization {
            id
            title
          }
        }
      }
    }
    operations {
      createTalentAvailabilityRequest {
        callable
        messages
      }
    }

    skillSets {
      ...TalentListSkillSetFragment
    }

    ...TalentsListAvailabilityFragment
    ...TalentsListProfileFragment
    ...TalentsListClientWillHireAgainFragment
    ...TalentsListEngagementRatesFragment
  }

  fragment TalentListSkillSetFragment on TalentSkillSets {
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
      vettedResult {
        result
      }
    }
  }

  fragment TalentsListAvailabilityFragment on Talent {
    id
    type
    roleTitle
    allocatedHoursAvailability(upcoming: true)
    allocatedHoursAvailabilityIncludingEndingEngagements: allocatedHoursAvailability(
      upcoming: false
    )
    availableHours(upcoming: true)
    availableHoursIncludingEndingEngagements: availableHours(upcoming: false)
    allocatedHours
    allocatedHoursConfirmedAt
    availabilityRequestMetadata {
      lowActivity
      pending
      prediction
      recentConfirmed
      recentRejected
    }
    preliminarySearchSetting {
      enabled
    }
    unavailableAllocatedHoursChangeRequest {
      ...UnavailableAllocatedHoursChangeRequestFragment
    }
    endingEngagements {
      nodes {
        id
        endDate
        commitment
        talent {
          id
          fullName
        }
        webResource {
          url
          text
        }
        proposedEnd {
          endDate
        }
        job {
          id
          title
          claimer {
            id
            fullName
            webResource {
              url
            }
          }
          claimerHandoff {
            replacement {
              id
              fullName
            }
            subject {
              id
              fullName
            }
          }
        }
      }
    }
  }

  fragment TalentsListProfileFragment on Talent {
    id
    profile: profileV2 {
      id
      yearsOfManagementExperience
      yearsOfEnterpriseExperience
      employments {
        cumulativeReportRange {
          from
          to
        }
      }
      customRequirements {
        backgroundCheck
        drugTest
        timeTrackingTools
      }
      travelVisas {
        nodes {
          id
          expiryDate
          visaType
          country {
            id
            name
          }
        }
        totalCount
      }
      industrySets {
        nodes {
          ...TalentProfileIndustrySetFragment
        }
      }
    }
  }

  fragment TalentsListClientWillHireAgainFragment on Talent {
    id
    feedbackStatistics(filter: { roleTitle: CLIENT }) {
      nodes {
        answers {
          nodes {
            label
            score
          }
          totalCount
        }
      }
    }
  }

  fragment TalentsListEngagementRatesFragment on Talent {
    engagements {
      counters {
        workingNumber
        clientsNumber
        repeatedClientsNumber
        acceptedInterviewsNumber
        approvedTrialsNumber
        interviewsNumber
        successRate
        trialsNumber
      }
    }
  }

  fragment TalentsListCurrentInterviewsFragment on TalentCurrentInterviews {
    totalCount
    inLast2DaysCounts {
      count
      engagementStatus
    }
    inLast2To7DaysCounts {
      count
      engagementStatus
    }
  }

  ${ROLE_FLAG_FRAGMENT}
  ${TALENT_PROFILE_INDUSTRY_SET_FRAGMENT}
  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
`
