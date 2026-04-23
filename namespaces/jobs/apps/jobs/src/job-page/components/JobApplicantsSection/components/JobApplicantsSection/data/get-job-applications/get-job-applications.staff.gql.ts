import { gql, useGetNode } from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT
} from '@staff-portal/facilities'

import { GetJobApplicationsDocument } from './get-job-applications.staff.gql.types'

export const GET_JOB_APPLICATIONS = gql`
  query GetJobApplications($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        status
        applications(
          filter: { statuses: [ACCEPTED, PENDING] }
          pagination: { offset: 0, limit: 30 }
        ) {
          nodes {
            ...JobApplicationItemFragment
          }
          totalCount
        }
      }
    }
  }

  fragment JobApplicationItemFragment on JobApplication {
    id
    createdAt
    jobIssues {
      status
      failedMetrics {
        message
        name
        status
      }
    }
    talentPitch {
      pitchText
    }
    talentJobScoring {
      bestMatchScore
      bestMatchScoreRank
      totalTalentRanked
    }
    requestedHourlyRate
    defaultClientRates {
      hourlyRate
      weeklyRateFullTime
      weeklyRatePartTime
    }
    talent {
      id
      ...JobApplicationTalentAvailabilityFragment
      ...WebResourceFragment
      associatedRoles(filter: { roleType: TALENT }) {
        nodes {
          ...JobApplicationTalentAvailabilityFragment
        }
      }
      fullName
      hourlyRate
      fullName
      resumeUrl
    }
    emailMessaging {
      id
    }
    resumeUrl
  }

  fragment JobApplicationTalentAvailabilityFragment on Talent {
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
        proposedEnd {
          endDate
        }
        ...WebResourceFragment
        job {
          id
          claimer {
            id
            fullName
            ...WebResourceFragment
          }
        }
      }
    }
  }

  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`

export const useGetJobApplications = (jobId: string) =>
  useGetNode(GetJobApplicationsDocument)({ jobId }, { throwOnError: true })
