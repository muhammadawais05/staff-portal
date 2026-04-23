import { ColorType } from '@toptal/picasso'
import {
  AvailabilityRequestStatus,
  AvailabilityRequestExpirationReason,
  AvailabilityRequestRejectReason
} from '@staff-portal/graphql/staff'

export const AVAILABILITY_REQUEST_STATUS_COLOR_MAPPING: Record<
  AvailabilityRequestStatus,
  ColorType
> = {
  [AvailabilityRequestStatus.PENDING]: 'yellow',
  [AvailabilityRequestStatus.REJECTED]: 'red',
  [AvailabilityRequestStatus.CANCELLED]: 'black',
  [AvailabilityRequestStatus.WITHDRAWN]: 'black',
  [AvailabilityRequestStatus.EXPIRED]: 'black',
  [AvailabilityRequestStatus.CONFIRMED]: 'green'
}

export const AVAILABILITY_REQUEST_EXPIRATION_REASON_MAPPING: Record<
  AvailabilityRequestExpirationReason,
  string
> = {
  [AvailabilityRequestExpirationReason.JOB_STARTED]: 'Talent started a job.',
  [AvailabilityRequestExpirationReason.JOB_CLOSED]: 'Job is closed.',
  [AvailabilityRequestExpirationReason.JOB_REMOVED]: 'Job was removed.',
  [AvailabilityRequestExpirationReason.JOB_POSTPONED]: 'Job was postponed.',
  [AvailabilityRequestExpirationReason.JOB_SENT_AWAY]: 'Job was sent away.',
  [AvailabilityRequestExpirationReason.NEW_AVAILABILITY_REQUEST]:
    'Talent received a new availability request.'
}

export const AVAILABILITY_REQUEST_REJECT_REASON_MAPPING: Record<
  AvailabilityRequestRejectReason,
  string
> = {
  [AvailabilityRequestRejectReason.SKILLS_NOT_FIT]:
    'Requested skills not a fit',
  [AvailabilityRequestRejectReason.TIMEZONE_OVERLAP_NOT_FIT]:
    'Time zone overlap is not a fit',
  [AvailabilityRequestRejectReason.NOT_ENOUGH_TIME]:
    "Don't have enough time at the moment",
  [AvailabilityRequestRejectReason.NOT_INTERESTED_IN_JOB]:
    'Not interested in this kind of job',
  [AvailabilityRequestRejectReason.NOT_INTERESTED_IN_CLIENT]:
    'Not interested in this kind of client',
  [AvailabilityRequestRejectReason.NOT_INTERESTED_IN_TOPTAL]:
    'Not looking for work from Toptal at the moment',
  [AvailabilityRequestRejectReason.WAITING_ANOTHER_CLIENT]:
    'Waiting to hear back on another Toptal engagement',
  [AvailabilityRequestRejectReason.JOB_DESCRIPTION]:
    'Job description is too vague',
  [AvailabilityRequestRejectReason.JOB_LENGTH_NOT_FIT]:
    "Estimated job length doesn't fit with my schedule",
  [AvailabilityRequestRejectReason.NOT_READY_FOR_TRAVEL]:
    'Not ready for travel',
  [AvailabilityRequestRejectReason.OTHER]: 'Other'
}
