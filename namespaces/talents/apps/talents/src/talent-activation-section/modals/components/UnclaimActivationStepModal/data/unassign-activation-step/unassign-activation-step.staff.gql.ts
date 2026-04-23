import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import {
  UnassignActivationStepDocument,
  UnassignActivationStepMutation
} from './unassign-activation-step.staff.gql.types'

export const UNASSIGN_ACTIVATION_STEP: typeof UnassignActivationStepDocument = gql`
  mutation UnassignActivationStep($input: UnassignActivationStepInput!) {
    unassignActivationStep(input: $input) {
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

export const useUnassignActivationStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: UnassignActivationStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(UNASSIGN_ACTIVATION_STEP, {
    onCompleted,
    onError
  })
