import { gql, useQuery } from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT
} from '@staff-portal/facilities'

import {
  GetAvailabilityRequestItemsDocument,
  GetAvailabilityRequestItemsQueryVariables
} from './get-availability-requests.staff.gql.types'

export const GET_AVAILABILITY_REQUESTS: typeof GetAvailabilityRequestItemsDocument = gql`
  query GetAvailabilityRequestItems(
    $jobId: ID!
    $status: AvailabilityRequestStatus
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $jobId) {
      ... on Job {
        id
        status
        jobType
        availabilityRequests(
          filter: { scope: ALL, status: $status }
          order: { field: CREATED_AT, direction: DESC }
          pagination: { offset: $offset, limit: $limit }
        ) {
          nodes {
            ...AvailabilityRequestItem
          }
          totalCount
        }
        totalAvailabilityRequests: availabilityRequests(
          filter: { scope: ALL }
        ) {
          totalCount
        }
      }
    }
  }

  fragment AvailabilityRequestItem on AvailabilityRequest {
    id
    talent {
      id
      cumulativeStatus
      type
      fullName
      suspended
      ...WebResourceFragment
      ...TalentAvailabilityOnAvailabilityRequest
      associatedRoles(filter: { roleType: TALENT }) {
        nodes {
          ...TalentAvailabilityOnAvailabilityRequest
        }
      }
      hourlyRate
    }
    jobIssues {
      status
      failedMetrics {
        status
        name
        message
      }
    }
    createdAt
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
    status
    expirationReason
    talentComment
    rejectReason
    sendCandidateUrl
    candidateStatus
    resumeUrl
  }

  fragment TalentAvailabilityOnAvailabilityRequest on Talent {
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
    availabilityRequestMetadata {
      ...AvailabilityRequestMetadataFragment
    }
    endingEngagements {
      nodes {
        id
        commitment
        endDate
        talent {
          id
          fullName
        }
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

  fragment AvailabilityRequestMetadataFragment on TalentAvailabilityRequestMetadata {
    lowActivity
    pending
    prediction
    recentConfirmed
    recentRejected
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
`

export const useGetAvailabilityRequests = (
  variables: GetAvailabilityRequestItemsQueryVariables
) => {
  const { data, loading, error, ...restOptions } = useQuery(
    GET_AVAILABILITY_REQUESTS,
    {
      variables,
      throwOnError: true
    }
  )

  return {
    data: data?.node,
    filteredAvailabilityRequests:
      data?.node?.availabilityRequests?.nodes.filter(
        availabilityRequest => !!availabilityRequest.talent
      ),
    loading,
    error,
    ...restOptions
  }
}
