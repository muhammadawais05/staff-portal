import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { CompleteMeetingWithSurveyDocument } from './complete-meeting-with-survey.staff.gql.types'
import { MEETING_FRAGMENT } from '../../../../../../data'

export const COMPLETE_MEETING_WITH_SURVEY: typeof CompleteMeetingWithSurveyDocument = gql`
  mutation CompleteMeetingWithSurvey($input: CompleteMeetingWithSurveyInput!) {
    completeMeetingWithSurvey(input: $input) {
      ...MutationResultFragment
      meeting {
        ...MeetingFragment
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${MEETING_FRAGMENT}
`

export const useCompleteMeetingWithSurvey = () =>
  useMutation(CompleteMeetingWithSurveyDocument)
