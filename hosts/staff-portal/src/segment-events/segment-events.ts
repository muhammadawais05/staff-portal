import {
  JobStationSegmentEvents,
  GigSegmentEvents
} from '@staff-portal/facilities'
import { TssSegmentEvents } from '@staff-portal/talents-screening-specialists'

// Combine all domain specific events here
type SegmentEvents =
  | TssSegmentEvents
  | JobStationSegmentEvents
  | GigSegmentEvents

export default SegmentEvents
