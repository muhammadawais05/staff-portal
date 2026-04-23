import { gql } from '@staff-portal/data-layer-service'

import {
  GOOGLE_CALENDAR_EVENT_FRAGMENT,
  SCHEDULE_ENGAGEMENT_FRAGMENT,
  SCHEDULE_INTERVIEW_FRAGMENT
} from '../../../../data'

export const GET_INTERVIEW_GOOGLE_EVENT_DATA = gql`
  query GetInterviewGoogleEventData($interviewId: ID!) {
    node(id: $interviewId) {
      ... on Interview {
        id
        ...ScheduleInterviewFragment

        engagement {
          id
          ...ScheduleEngagementFragment
        }

        googleCalendarEvent {
          ...GoogleCalendarEventFragment
        }
      }
    }
  }

  ${SCHEDULE_ENGAGEMENT_FRAGMENT}
  ${SCHEDULE_INTERVIEW_FRAGMENT}
  ${GOOGLE_CALENDAR_EVENT_FRAGMENT}
`
