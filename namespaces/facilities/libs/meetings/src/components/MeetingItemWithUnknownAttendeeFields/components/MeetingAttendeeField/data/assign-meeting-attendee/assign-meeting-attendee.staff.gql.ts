import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { AssignMeetingAttendeeDocument } from './assign-meeting-attendee.staff.gql.types'
import { MEETING_FRAGMENT } from '../../../../../../data'

export const ASSIGN_MEETING_ATTENDEE: typeof AssignMeetingAttendeeDocument = gql`
  mutation AssignMeetingAttendee($meetingId: ID!, $attendeeId: ID!) {
    assignMeetingAttendee(
      input: { meetingId: $meetingId, attendeeId: $attendeeId }
    ) {
      ...MutationResultFragment
      meeting {
        ...MeetingFragment
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`

export const useAssignAttendee = ({
  onError
}: {
  onError: (error: Error) => void
}) => useMutation(ASSIGN_MEETING_ATTENDEE, { onError })
