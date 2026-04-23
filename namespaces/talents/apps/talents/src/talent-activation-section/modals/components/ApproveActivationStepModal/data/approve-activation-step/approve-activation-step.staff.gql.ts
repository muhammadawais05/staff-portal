import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import {
  ApproveActivationStepDocument,
  ApproveActivationStepMutation
} from './approve-activation-step.staff.gql.types'

export const APPROVE_ACTIVATION_STEP: typeof ApproveActivationStepDocument = gql`
  mutation ApproveActivationStep($input: ApproveActivationStepInput!) {
    approveActivationStep(input: $input) {
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

export const useApproveActivationStep = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ApproveActivationStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(APPROVE_ACTIVATION_STEP, {
    onCompleted,
    onError
  })
