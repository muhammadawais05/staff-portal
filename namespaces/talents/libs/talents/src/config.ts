import { ColorType } from '@toptal/picasso'
import {
  SourcingRequestStatus,
  SourcingStatus
} from '@staff-portal/graphql/staff'
import { palette } from '@toptal/picasso/utils'

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
  [SourcingRequestStatus.PAUSED]: 'yellow',
  [SourcingRequestStatus.BACKLOG]: 'yellow',
  [SourcingRequestStatus.MONITORING]: 'yellow'
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
  [SourcingRequestStatus.CLOSED_NETWORK]: 'A network candidate is working.',
  [SourcingRequestStatus.CLOSED_LOST]:
    'The need was real and we were unable to fulfill.',
  [SourcingRequestStatus.CLOSED_NOT_AVAILABLE]:
    'The job is not available as the client changed their mind.',
  [SourcingRequestStatus.PAUSED]:
    'Sourcing is on hold and awaiting updates from the client.',
  [SourcingRequestStatus.BACKLOG]: 'Sourcing request is not within capacity.',
  [SourcingRequestStatus.MONITORING]:
    'Sourcing request has fallen outside capacity after being actively worked on.'
}

export const SOURCED_TALENT_STATUS_MAPPING: Record<
  SourcingStatus,
  {
    color: string
    text: string
    tooltip?: ({ name }: { name?: string }) => string
  }
> = {
  [SourcingStatus.ACCEPTED_WITHOUT_COMMISSION]: {
    color: palette.green.main,
    text: 'Accepted',
    tooltip: ({ name }: { name?: string }) =>
      `${name} is now a member of our network.`
  },
  [SourcingStatus.INACTIVE]: {
    color: palette.red.main,
    text: 'Inactive',
    tooltip: ({ name }: { name?: string }) =>
      `${name} is no longer a member of the community.`
  },
  [SourcingStatus.IN_ONBOARDING]: {
    color: palette.blue.dark,
    text: 'Onboarding'
  },
  [SourcingStatus.REGISTERED]: {
    color: palette.blue.dark,
    text: 'Registered',
    tooltip: ({ name }: { name?: string }) =>
      `${name} created a profile using your referral link and has to go through the English screening.`
  },
  [SourcingStatus.REJECTED]: {
    color: palette.red.main,
    text: 'Not approved',
    tooltip: ({ name }: { name?: string }) =>
      `Unfortunately, ${name} did not pass the tests to join our network.`
  },
  [SourcingStatus.SCREENING_ENGLISH]: {
    color: palette.blue.dark,
    text: 'English screening',
    tooltip: ({ name }: { name?: string }) =>
      `${name} contacted our English screeners for scheduling the first interview.`
  },
  [SourcingStatus.SCREENING_TECHNICAL]: {
    color: palette.blue.dark,
    text: 'Technical screening',
    tooltip: ({ name }: { name?: string }) =>
      `${name} is going through the technical screening.`
  },
  [SourcingStatus.VERIFYING_INFORMATION]: {
    color: palette.blue.dark,
    text: 'Verifying information',
    tooltip: ({ name }: { name?: string }) =>
      `${name} passed the screening and we are working to create a Toptal profile.`
  }
}

export const TALENT_PAGE_BATCH_KEY = 'TALENT_PAGE_BATCH_KEY'
