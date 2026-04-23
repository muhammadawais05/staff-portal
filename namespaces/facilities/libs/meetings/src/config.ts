import { ColorType } from '@toptal/picasso'
import { MeetingOutcome, MeetingStatus } from '@staff-portal/graphql/staff'

export type StatusText = {
  color?: ColorType
  text: string
}

type StatusMapping = {
  [key in MeetingStatus]: StatusText
}

type OutcomeMapping = {
  [key in MeetingOutcome]: string
}

export const STATUS_MAPPING: StatusMapping = {
  [MeetingStatus.SCHEDULED]: {
    color: 'yellow',
    text: 'Scheduled'
  },
  [MeetingStatus.CANCELLED]: {
    color: 'red',
    text: 'Cancelled'
  },
  [MeetingStatus.STARTED]: {
    color: 'yellow',
    text: 'Started'
  },
  [MeetingStatus.FINISHED]: {
    color: 'green',
    text: 'Finished'
  },
  [MeetingStatus.COMPLETED]: {
    color: 'green',
    text: 'Completed'
  },
  [MeetingStatus.FAILED]: {
    color: 'red',
    text: 'Not Completed'
  },
  [MeetingStatus.RESCHEDULED]: {
    color: 'red',
    text: 'Rescheduled'
  },
  [MeetingStatus.ORGANIZER_CHANGED]: {
    color: 'red',
    text: 'Organizer Changed'
  },
  [MeetingStatus.REMOVED]: {
    color: undefined,
    text: 'Removed'
  },
  [MeetingStatus.CANCELLED_BY_DEFAULT]: {
    color: undefined,
    text: 'Cancelled by Default'
  }
}

export const OUTCOME_MAPPING: OutcomeMapping = {
  [MeetingOutcome.NO_SHOW]: "Attendee didn't show up",
  [MeetingOutcome.RESCHEDULING_REQUIRED]: 'Rescheduling required',
  [MeetingOutcome.CANCELLED_BY_HOST]: 'Cancelled by Host',
  [MeetingOutcome.OTHER]: 'Other'
}

export const NOT_COMPLETED_REASONS = Object.keys(OUTCOME_MAPPING).map(key => ({
  value: key,
  text: OUTCOME_MAPPING[key as MeetingOutcome]
}))
