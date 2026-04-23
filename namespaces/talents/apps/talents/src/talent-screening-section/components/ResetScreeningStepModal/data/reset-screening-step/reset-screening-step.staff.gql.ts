import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  UnapproveRoleStepDocument,
  UnapproveRoleStepMutation
} from './reset-screening-step.staff.gql.types'

export const RESET_SCREENING_STEP: typeof UnapproveRoleStepDocument = gql`
  mutation UnapproveRoleStep($input: UnapproveRoleStepInput!) {
    unapproveRoleStep(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useResetScreeningStep = ({
  onError
}: {
  onCompleted?: (data: UnapproveRoleStepMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(RESET_SCREENING_STEP, {
    onError
  })
