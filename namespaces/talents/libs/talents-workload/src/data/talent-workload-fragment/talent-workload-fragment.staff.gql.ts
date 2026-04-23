import { gql } from '@staff-portal/data-layer-service'
import {
  WEB_RESOURCE_FRAGMENT,
  UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT
} from '@staff-portal/facilities'

export const TALENT_WORKLOAD_FRAGMENT = gql`
  fragment TalentWorkloadFragment on Talent {
    averageWorkingHours
    workingPeriods {
      nodes {
        ...TalentProfileWorkingPeriod
      }
    }
    engagements(filter: { working: true }) {
      nodes {
        ...TalentWorkingEngagement
      }
    }
    ...TalentWorkloadTalentAvailabilityFragment

    associatedRoles(filter: { roleType: TALENT }) {
      nodes {
        ...TalentWorkloadTalentAvailabilityFragment
      }
    }

    operations {
      updateTalentAllocatedHours {
        ...TalentWorkingOperationFragment
      }
    }
  }

  fragment TalentProfileWorkingPeriod on TalentWorkingPeriod {
    start
    stop
    workingHours
    activeEngagements {
      edges {
        workingHours
        node {
          id
          job {
            id
            title
            ...WebResourceFragment
          }
        }
      }
    }
  }

  fragment TalentWorkingEngagement on Engagement {
    id
    commitment
    job {
      id
      ...WebResourceFragment
    }
  }

  fragment TalentWorkingOperationFragment on Operation {
    callable
    messages
  }

  fragment TalentWorkloadTalentAvailabilityFragment on Talent {
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

  ${WEB_RESOURCE_FRAGMENT}
  ${UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT}
`
