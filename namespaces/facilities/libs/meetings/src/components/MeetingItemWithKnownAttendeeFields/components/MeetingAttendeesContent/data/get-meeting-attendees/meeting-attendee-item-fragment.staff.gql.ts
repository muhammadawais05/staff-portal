import { gql } from '@staff-portal/data-layer-service'

export const MEETING_ATTENDEE_ITEM_FRAGMENT = gql`
  fragment MeetingAttendeeItemFragment on MeetingEndpoint {
    id
    name
    countryName
    meetingJoinTime
    meetingLeaveTime
  }
`
