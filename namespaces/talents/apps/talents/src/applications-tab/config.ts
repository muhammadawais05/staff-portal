import { ColorType } from '@toptal/picasso'
import {
  AvailabilityRequestStatus,
  JobApplicationStatus
} from '@staff-portal/graphql/staff'

export const APPLICATION_TAB_BATCH_KEY = 'APPLICATION_TAB_BATCH_KEY'

export const AVAILABILITY_REQUESTS_COLOR_MAPPING: Record<
  AvailabilityRequestStatus,
  ColorType
> = {
  [AvailabilityRequestStatus.REJECTED]: 'red',
  [AvailabilityRequestStatus.CONFIRMED]: 'green',
  [AvailabilityRequestStatus.PENDING]: 'yellow',
  [AvailabilityRequestStatus.EXPIRED]: 'dark-grey',
  [AvailabilityRequestStatus.CANCELLED]: 'dark-grey',
  [AvailabilityRequestStatus.WITHDRAWN]: 'dark-grey'
}

export const JOB_APPLICATION_STATUS_COLOR_MAPPING: Record<
  JobApplicationStatus,
  ColorType
> = {
  [JobApplicationStatus.ACCEPTED]: 'green',
  [JobApplicationStatus.CANCELLED]: 'red',
  [JobApplicationStatus.PENDING]: 'yellow',
  [JobApplicationStatus.POSITION_FULFILLED]: 'green',
  [JobApplicationStatus.REJECTED]: 'red'
}
