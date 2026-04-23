import { createMutationMocks } from '@staff-portal/test-utils'

import {
  ClaimTechnicalOneRoleStepMutation,
  ClaimTechnicalOneRoleStepMutationVariables
} from './claim-technical-one-role-step.staff.gql.types'
import { CLAIM_TECHNICAL_ONE_STEP } from './claim-technical-one-role-step.staff.gql'

export const {
  success: createClaimTechnicalOneRoleStepMock,
  failed: createClaimTechnicalOneRoleStepFailedMock
} = createMutationMocks<
  ClaimTechnicalOneRoleStepMutationVariables['input'],
  ClaimTechnicalOneRoleStepMutation
>({
  options: {
    query: CLAIM_TECHNICAL_ONE_STEP,
    key: 'claimTechnicalOneRoleStep',
    keyTypename: 'ClaimTechnicalOneRoleStepPayload'
  },
  successOptions: {
    additionalResponse: {
      nextAction: null,
      emailTemplate: null,
      roleStep: null
    }
  }
})
