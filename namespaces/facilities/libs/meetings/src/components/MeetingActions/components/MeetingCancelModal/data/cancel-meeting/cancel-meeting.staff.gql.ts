import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { MEETING_FRAGMENT } from '../../../../../../data'

export default gql`
  mutation CancelMeeting($input: CancelMeetingInput!) {
    cancelMeeting(input: $input) {
      ...MutationResultFragment
      nextActionName
      cancelMeetingEmailTemplate {
        id
      }
      meeting {
        ...MeetingFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`
