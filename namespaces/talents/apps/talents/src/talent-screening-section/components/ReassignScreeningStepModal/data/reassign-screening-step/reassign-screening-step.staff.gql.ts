import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ReassignScreeningStepDocument,
  ReassignScreeningStepMutation
} from './reassign-screening-step.staff.gql.types'

export const REASSIGN_SCREENING_STEP: typeof ReassignScreeningStepDocument = gql`
  mutation ReassignScreeningStep($input: ReassignRoleStepInput!) {
    reassignRoleStep(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useReassignScreeningStep = ({
  onError
}: {
  onCompleted?: (data: ReassignScreeningStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(REASSIGN_SCREENING_STEP, {
    onError
  })
