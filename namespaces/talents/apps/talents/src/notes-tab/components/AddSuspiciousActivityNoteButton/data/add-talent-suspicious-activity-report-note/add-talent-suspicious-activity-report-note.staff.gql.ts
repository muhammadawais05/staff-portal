import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  AddTalentSuspiciousActivityReportNoteMutation,
  AddTalentSuspiciousActivityReportNoteMutationVariables
} from './add-talent-suspicious-activity-report-note.staff.gql.types'

export const ADD_TALENT_SUSPICIOUS_ACTIVITY_REPORT_NOTE = gql`
  mutation AddTalentSuspiciousActivityReportNote(
    $input: AddTalentSuspiciousActivityReportNoteInput!
  ) {
    addTalentSuspiciousActivityReportNote(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useAddTalentSuspiciousActivityReportNote = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AddTalentSuspiciousActivityReportNoteMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation<
    AddTalentSuspiciousActivityReportNoteMutation,
    AddTalentSuspiciousActivityReportNoteMutationVariables
  >(ADD_TALENT_SUSPICIOUS_ACTIVITY_REPORT_NOTE, {
    onCompleted,
    onError,
    ignoreResults: true
  })
