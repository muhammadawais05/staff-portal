import { QueryParams } from '@staff-portal/query-params-state'
import { JobStationSegmentEvents } from '@staff-portal/facilities'

export const trackStatusFiltersClick = (
  old: QueryParams,
  current: QueryParams,
  trackCallback: Function
) => {
  if (old.cumulative_statuses !== current.cumulative_statuses) {
    trackCallback(JobStationSegmentEvents.JOB_FILTERS)
  } else {
    // Ignore changes in pending_talent_status if there was change in cumulative_statuses
    // This can be false possitive check when user deselects Pending Talent status
    if (old.pending_talent_status !== current.pending_talent_status) {
      trackCallback(JobStationSegmentEvents.TALENT_FILTERS)
    }
  }
}
