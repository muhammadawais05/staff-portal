import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { MEETING_FRAGMENT } from '@staff-portal/meetings'

import { GetClientScheduledMeetingsDocument } from './get-client-meetings.staff.gql.types'

export const GET_CLIENT_SCHEDULED_MEETINGS: typeof GetClientScheduledMeetingsDocument = gql`
  query GetClientScheduledMeetings($id: ID!) {
    node(id: $id) {
      ...CompanyScheduledMeetingsFragment
    }
  }

  fragment CompanyScheduledMeetingsFragment on Client {
    id
    type
    fullName
    scheduleMeetingUrl
    scheduledMeetings {
      nodes {
        ...MeetingFragment
      }
    }
  }

  ${MEETING_FRAGMENT}
`

export const useGetClientScheduledMeetings = ({ id }: { id: string }) =>
  useGetNode(GET_CLIENT_SCHEDULED_MEETINGS)(
    { id },
    {
      throwOnError: true
    }
  )
