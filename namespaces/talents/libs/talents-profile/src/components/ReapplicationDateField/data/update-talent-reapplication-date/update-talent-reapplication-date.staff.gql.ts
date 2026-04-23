import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateTalentReapplicationDateDocument,
  UpdateTalentReapplicationDateMutation
} from './update-talent-reapplication-date.staff.gql.types'

export const UPDATE_TALENT_REAPPLICATION_DATE: typeof UpdateTalentReapplicationDateDocument = gql`
  mutation UpdateTalentReapplicationDate(
    $input: UpdateTalentReapplicationDateInput!
  ) {
    updateTalentReapplicationDate(input: $input) {
      ...MutationResultFragment
      talent {
        id
        reapplicationDate
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateTalentReapplicationDate = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: UpdateTalentReapplicationDateMutation) => void
  onError: () => void
}) =>
  useMutation(UPDATE_TALENT_REAPPLICATION_DATE, {
    onCompleted,
    onError
  })
