import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { MEETING_FRAGMENT } from '../../../../../../data'

export default gql`
  mutation RemoveMeeting($input: RemoveMeetingInput!) {
    removeMeeting(input: $input) {
      meeting {
        ...MeetingFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`
