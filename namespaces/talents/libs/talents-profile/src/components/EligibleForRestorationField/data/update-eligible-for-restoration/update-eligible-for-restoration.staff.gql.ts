import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UpdateEligibleForRestorationDocument,
  UpdateEligibleForRestorationMutation
} from './update-eligible-for-restoration.staff.gql.types'

export const UPDATE_ELIGIBLE_FOR_RESTORATION: typeof UpdateEligibleForRestorationDocument = gql`
  mutation UpdateEligibleForRestoration(
    $input: UpdateEligibleForRestorationInput!
  ) {
    updateEligibleForRestoration(input: $input) {
      talent {
        id
        eligibleForRestoration
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useUpdateEligibleForRestoration = ({
  onError,
  onCompleted
}: {
  onError: () => void
  onCompleted?: (data: UpdateEligibleForRestorationMutation) => void
}) =>
  useMutation(UPDATE_ELIGIBLE_FOR_RESTORATION, {
    onError,
    onCompleted
  })
