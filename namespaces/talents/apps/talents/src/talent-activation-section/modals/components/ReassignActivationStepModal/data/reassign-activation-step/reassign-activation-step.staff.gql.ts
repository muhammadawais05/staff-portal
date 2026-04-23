import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import {
  ReassignActivationStepDocument,
  ReassignActivationStepMutation
} from './reassign-activation-step.staff.gql.types'

export const REASSIGN_ACTIVATION_STEP: typeof ReassignActivationStepDocument = gql`
  mutation ReassignActivationStep($input: ReassignActivationStepInput!) {
    reassignActivationStep(input: $input) {
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

export const useReassignActivationStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ReassignActivationStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(REASSIGN_ACTIVATION_STEP, {
    onCompleted,
    onError
  })
