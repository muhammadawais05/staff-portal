import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const UPDATE_INTERVIEW_GOOGLE_CALENDAR_EVENT = gql`
  mutation UpdateInterviewGoogleCalendarEvent(
    $input: UpdateInterviewGoogleCalendarEventInput!
  ) {
    updateInterviewGoogleCalendarEvent(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
