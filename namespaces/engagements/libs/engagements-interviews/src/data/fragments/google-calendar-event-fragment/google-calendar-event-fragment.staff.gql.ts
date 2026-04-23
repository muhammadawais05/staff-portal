import { gql } from '@staff-portal/data-layer-service'

export const GOOGLE_CALENDAR_EVENT_FRAGMENT = gql`
  fragment GoogleCalendarEventFragment on GoogleCalendarEvent {
    attendees
    description
    summary
  }
`
