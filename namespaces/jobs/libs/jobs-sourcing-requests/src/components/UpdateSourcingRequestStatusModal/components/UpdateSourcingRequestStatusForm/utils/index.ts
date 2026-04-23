import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

export const getSortedSourcingRequestStatuses = (): SourcingRequestStatus[] => {
  const {
    DRAFTED,
    REQUESTED,
    FEASIBILITY,
    REQUEST_REJECTED,
    ACTIVE_SOURCING,
    SOURCED,
    CLOSED_SOURCED,
    CLOSED_NETWORK,
    CLOSED_LOST,
    CLOSED_NOT_AVAILABLE,
    PAUSED,
    ...other
  } = SourcingRequestStatus

  return [
    DRAFTED,
    REQUESTED,
    FEASIBILITY,
    REQUEST_REJECTED,
    ACTIVE_SOURCING,
    SOURCED,
    CLOSED_SOURCED,
    CLOSED_NETWORK,
    CLOSED_LOST,
    CLOSED_NOT_AVAILABLE,
    PAUSED,
    ...(Object.keys(other) as SourcingRequestStatus[])
  ]
}
