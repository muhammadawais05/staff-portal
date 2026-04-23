import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { ClaimTechnicalOneRoleStepDocument } from './claim-technical-one-role-step.staff.gql.types'
import { ROLE_STEP_NEXT_ACTION_FRAGMENT } from '../../../../data'

export const CLAIM_TECHNICAL_ONE_STEP: typeof ClaimTechnicalOneRoleStepDocument = gql`
  mutation ClaimTechnicalOneRoleStep($input: ClaimTechnicalOneRoleStepInput!) {
    claimTechnicalOneRoleStep(input: $input) {
      ...MutationResultFragment
      ...RoleStepNextActionFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${ROLE_STEP_NEXT_ACTION_FRAGMENT}
`

export const useClaimTechnicalOneRoleStep = ({
  onError
}: {
  onError: (error: Error) => void
}) =>
  useMutation(CLAIM_TECHNICAL_ONE_STEP, {
    onError
  })
