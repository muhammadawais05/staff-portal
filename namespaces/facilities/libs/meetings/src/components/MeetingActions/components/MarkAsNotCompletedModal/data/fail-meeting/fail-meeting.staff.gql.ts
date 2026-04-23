import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { MEETING_FRAGMENT } from '../../../../../../data'

export default gql`
  mutation FailMeeting($input: FailMeetingInput!) {
    failMeeting(input: $input) {
      ...MutationResultFragment
      meeting {
        ...MeetingFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`
