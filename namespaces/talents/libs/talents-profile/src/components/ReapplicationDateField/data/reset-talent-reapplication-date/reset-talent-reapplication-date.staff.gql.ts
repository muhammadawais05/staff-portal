import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ResetTalentReapplicationDateDocument,
  ResetTalentReapplicationDateMutation
} from './reset-talent-reapplication-date.staff.gql.types'

export const RESET_TALENT_REAPPLICATION_DATE = gql`
  mutation ResetTalentReapplicationDate(
    $input: ResetTalentReapplicationDateInput!
  ) {
    resetTalentReapplicationDate(input: $input) {
      ...MutationResultFragment
      talent {
        id
        reapplicationDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetTalentReapplicationDate = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: ResetTalentReapplicationDateMutation) => void
  onError: () => void
}) =>
  useMutation(ResetTalentReapplicationDateDocument, {
    onCompleted,
    onError
  })
