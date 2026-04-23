import { gql, useQuery } from '@staff-portal/data-layer-service'
import { MEETING_FRAGMENT } from '@staff-portal/meetings'

import { GetRoleScheduledMeetingsDocument } from './get-role-meetings.staff.gql.types'

export const GET_ROLE_SCHEDULED_MEETINGS: typeof GetRoleScheduledMeetingsDocument = gql`
  query GetRoleScheduledMeetings($id: ID!) {
    staffNode(id: $id) {
      ...TalentScheduledMeetingsFragment
    }
  }

  fragment TalentScheduledMeetingsFragment on Role {
    id
    type
    roleTitle
    fullName
    scheduleMeetingUrl
    scheduledMeetings(order: { direction: ASC, field: SCHEDULED_AT }) {
      nodes {
        ...MeetingFragment
      }
    }
  }

  ${MEETING_FRAGMENT}
`

export const useGetRoleScheduledMeetings = ({
  id,
  onError
}: {
  id: string
  onError: () => void
}) => {
  const { data, ...restOptions } = useQuery(GET_ROLE_SCHEDULED_MEETINGS, {
    throwOnError: true,
    variables: { id },
    onError,
    fetchPolicy: 'cache-first'
  })

  return { ...restOptions, data: data?.staffNode }
}
