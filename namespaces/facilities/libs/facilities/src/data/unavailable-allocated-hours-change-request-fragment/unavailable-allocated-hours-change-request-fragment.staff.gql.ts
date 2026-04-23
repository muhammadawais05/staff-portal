import { gql } from '@staff-portal/data-layer-service'

export const UNAVAILABLE_ALLOCATED_HOURS_CHANGE_REQUEST_FRAGMENT = gql`
  fragment UnavailableAllocatedHoursChangeRequestFragment on AllocatedHoursChangeRequest {
    id
    comment
    futureCommitment
    rejectReason
    returnInDate
  }
`
