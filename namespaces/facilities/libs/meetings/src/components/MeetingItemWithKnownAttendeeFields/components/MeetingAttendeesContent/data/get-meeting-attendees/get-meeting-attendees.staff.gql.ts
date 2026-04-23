import { gql, useQuery } from '@staff-portal/data-layer-service'

import { MEETING_ATTENDEE_ITEM_FRAGMENT } from './meeting-attendee-item-fragment.staff.gql'
import {
  GetMeetingAttendeesDocument,
  GetMeetingAttendeesQueryVariables
} from './get-meeting-attendees.staff.gql.types'

export const GET_MEETING_ATTENDEES = gql`
  query GetMeetingAttendees(
    $pagination: OffsetPagination!
    $meetingUrl: String!
  ) {
    meetingEndpoints(pagination: $pagination, meetingUrl: $meetingUrl) {
      nodes {
        ...MeetingAttendeeItemFragment
      }
      totalCount
    }
  }
  ${MEETING_ATTENDEE_ITEM_FRAGMENT}
`

export const useGetMeetingAttendees = (
  variables: GetMeetingAttendeesQueryVariables,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(
    GetMeetingAttendeesDocument,
    {
      variables,
      throwOnError: true,
      skip
    }
  )

  return { data, error, ...restOptions }
}
