import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  RestoreTalentActivationDocument,
  RestoreTalentActivationMutation
} from './restore-talent-activation.staff.gql.types'

export const RESTORE_TALENT_ACTIVATION: typeof RestoreTalentActivationDocument = gql`
  mutation RestoreTalentActivation($input: RestoreTalentActivationInput!) {
    restoreTalentActivation(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useRestoreTalentActivation = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted?: (data: RestoreTalentActivationMutation) => void
}) =>
  useMutation(RESTORE_TALENT_ACTIVATION, {
    onError,
    onCompleted
  })
