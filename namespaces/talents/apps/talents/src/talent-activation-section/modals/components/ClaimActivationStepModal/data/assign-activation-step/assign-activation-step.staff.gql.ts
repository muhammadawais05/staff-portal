import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import {
  AssignActivationStepDocument,
  AssignActivationStepMutation
} from './assign-activation-step.staff.gql.types'

export const ASSIGN_ACTIVATION_STEP: typeof AssignActivationStepDocument = gql`
  mutation AssignActivationStep($input: AssignActivationStepInput!) {
    assignActivationStep(input: $input) {
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

export const useAssignActivationStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: AssignActivationStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(ASSIGN_ACTIVATION_STEP, {
    onCompleted,
    onError
  })
