import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { UpdateTopShieldApplicationScheduledEndDateDocument } from './update-top-shield-application-scheduled-end-date.staff.gql.types'

export const UPDATE_TOP_SHIELD_APPLICATION_SCHEDULED_END_DATE = gql`
  mutation UpdateTopShieldApplicationScheduledEndDate(
    $input: UpdateTopShieldApplicationScheduledEndDateInput!
  ) {
    updateTopShieldApplicationScheduledEndDate(input: $input) {
      ...MutationResultFragment
      topShieldApplication {
        id
        scheduledEndDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTopShieldApplicationScheduledEndDate = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(UpdateTopShieldApplicationScheduledEndDateDocument, { onError })
