import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ClaimTechnicalTwoRoleStepDocument } from './claim-technical-two-role-step.staff.gql.types'
import { ROLE_STEP_NEXT_ACTION_FRAGMENT } from '../../../../data'

export const CLAIM_TECHNICAL_TWO_ROLE_STEP: typeof ClaimTechnicalTwoRoleStepDocument = gql`
  mutation ClaimTechnicalTwoRoleStep($input: ClaimTechnicalTwoRoleStepInput!) {
    claimTechnicalTwoRoleStep(input: $input) {
      ...MutationResultFragment
      ...RoleStepNextActionFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${ROLE_STEP_NEXT_ACTION_FRAGMENT}
`

export const useClaimTechnicalTwoRoleStep = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(CLAIM_TECHNICAL_TWO_ROLE_STEP, {
    onError
  })
