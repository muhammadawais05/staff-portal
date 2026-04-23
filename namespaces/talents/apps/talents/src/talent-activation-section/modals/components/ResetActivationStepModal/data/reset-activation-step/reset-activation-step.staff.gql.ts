import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import {
  ResetActivationStepDocument,
  ResetActivationStepMutation
} from './reset-activation-step.staff.gql.types'

export const UNASSIGN_ACTIVATION_STEP: typeof ResetActivationStepDocument = gql`
  mutation ResetActivationStep($input: ResetActivationStepInput!) {
    resetActivationStep(input: $input) {
      activation {
        id
        steps {
          nodes {
            ...ActivationStepFragment
          }
        }
      }
      ...MutationResultFragment
    }
  }

  ${ACTIVATION_STEP_FRAGMENT}
  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetActivationStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ResetActivationStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(UNASSIGN_ACTIVATION_STEP, {
    onCompleted,
    onError
  })
