import { gql } from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT
} from '@staff-portal/facilities'

export const TALENT_AVAILABILITY_FRAGMENT = gql`
  fragment TalentAvailabilityFragment on Talent {
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
        proposedEnd {
          endDate
        }
        commitment
        ...WebResourceFragment
        job {
          id
          claimer {
            id
            fullName
            webResource {
              url
            }
          }
        }
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
`
