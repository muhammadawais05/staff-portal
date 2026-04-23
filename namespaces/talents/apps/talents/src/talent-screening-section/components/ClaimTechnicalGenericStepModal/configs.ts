import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import {
  useClaimTechnicalOneRoleStep,
  useClaimTechnicalTwoRoleStep
} from './data'

export const CLAIM_TECHNICAL_STEP_MUTATION_HOOK_MAPPING = {
  [RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP]:
    useClaimTechnicalOneRoleStep,
  [RoleStepMainActions.CLAIM_TECHNICAL_TWO_ROLE_STEP]:
    useClaimTechnicalTwoRoleStep
}
