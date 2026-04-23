import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  CreateMeetingDocument,
  CreateMeetingMutation
} from './create-meeting.staff.gql.types'

export const CREATE_MEETING: typeof CreateMeetingDocument = gql`
  mutation CreateMeeting($input: CreateMeetingInput!) {
    createMeeting(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useCreateMeeting = ({
  onError,
  onCompleted
}: {
  onError?: () => void
  onCompleted?: (data: CreateMeetingMutation) => void
} = {}) =>
  useMutation(CREATE_MEETING, {
    onError,
    onCompleted
  })
