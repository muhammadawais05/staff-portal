import { ColorType } from '@toptal/picasso'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

export const SOURCING_REQUEST_STATUS_COLOR_MAPPING: {
  [key in SourcingRequestStatus | string]: ColorType
} = {
  [SourcingRequestStatus.REQUESTED]: 'yellow',
  [SourcingRequestStatus.DRAFTED]: 'yellow',
  [SourcingRequestStatus.FEASIBILITY]: 'yellow',
  [SourcingRequestStatus.REQUEST_REJECTED]: 'red',
  [SourcingRequestStatus.ACTIVE_SOURCING]: 'green',
  [SourcingRequestStatus.SOURCED]: 'green',
  [SourcingRequestStatus.CLOSED_SOURCED]: 'black',
  [SourcingRequestStatus.CLOSED_NETWORK]: 'black',
  [SourcingRequestStatus.CLOSED_LOST]: 'red',
  [SourcingRequestStatus.CLOSED_NOT_AVAILABLE]: 'black',
  [SourcingRequestStatus.PAUSED]: 'yellow'
}

export const SOURCING_REQUEST_STATUS_TEXT_MAPPING: {
  [key in SourcingRequestStatus | string]: string
} = {
  [SourcingRequestStatus.REQUESTED]: 'The sourcing request was submitted.',
  [SourcingRequestStatus.DRAFTED]:
    'The matcher is working on finalizing this request.',
  [SourcingRequestStatus.FEASIBILITY]: 'Working on the feasibility study.',
  [SourcingRequestStatus.REQUEST_REJECTED]:
    'The current request was rejected. Updates are required.',
  [SourcingRequestStatus.ACTIVE_SOURCING]:
    'This request was accepted. Sourcing is active.',
  [SourcingRequestStatus.SOURCED]:
    'Sourced candidates are currently being presented to the client. No additional sourcing is required.',
  [SourcingRequestStatus.CLOSED_SOURCED]: 'A sourced candidate is working.',
  [SourcingRequestStatus.CLOSED_NETWORK]: 'A sourced candidate is working.',
  [SourcingRequestStatus.CLOSED_LOST]:
    'The need was real and we were unable to fulfill.',
  [SourcingRequestStatus.CLOSED_NOT_AVAILABLE]:
    'The job is not available as the client changed their mind.',
  [SourcingRequestStatus.PAUSED]:
    'Sourcing is on hold and awaiting updates from the client.'
}
