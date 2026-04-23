import { createMutationMocks } from '@staff-portal/test-utils'

import {
  ClaimTechnicalTwoRoleStepMutation,
  ClaimTechnicalTwoRoleStepMutationVariables
} from './claim-technical-two-role-step.staff.gql.types'
import { CLAIM_TECHNICAL_TWO_ROLE_STEP } from './claim-technical-two-role-step.staff.gql'

export const {
  success: createClaimTechnicalTwoRoleStepMock,
  failed: createClaimTechnicalTwoRoleStepFailedMock
} = createMutationMocks<
  ClaimTechnicalTwoRoleStepMutationVariables['input'],
  ClaimTechnicalTwoRoleStepMutation
>({
  options: {
    query: CLAIM_TECHNICAL_TWO_ROLE_STEP,
    key: 'claimTechnicalTwoRoleStep',
    keyTypename: 'ClaimTechnicalTwoRoleStepPayload'
  },
  successOptions: {
    additionalResponse: {
      nextAction: null,
      emailTemplate: null,
      roleStep: null
    }
  }
})
