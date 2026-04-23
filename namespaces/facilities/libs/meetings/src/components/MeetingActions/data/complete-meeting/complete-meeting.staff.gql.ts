import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CompleteMeetingDocument } from './complete-meeting.staff.gql.types'
import { MEETING_FRAGMENT } from '../../../../data'

export const COMPLETE_MEETING: typeof CompleteMeetingDocument = gql`
  mutation CompleteMeeting($meetingId: ID!) {
    completeMeeting(input: { meetingId: $meetingId }) {
      ...MutationResultFragment
      meeting {
        ...MeetingFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`

export const useCompleteMeeting = () => useMutation(COMPLETE_MEETING)
