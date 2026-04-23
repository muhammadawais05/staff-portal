import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import { getClaimTechnicalGenericStepMutationResult } from './get-claim-technical-generic-step-mutation-result'

describe('getClaimTechnicalGenericStepMutationResult', () => {
  it('returns undefined for missing data', () => {
    const result = getClaimTechnicalGenericStepMutationResult({
      actionName: RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP
    })

    expect(result).toBeUndefined()
  })

  it('returns undefined for uncovered action name', () => {
    const result = getClaimTechnicalGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      data: {
        claimTechnicalOneRoleStep: {
          __typename: 'ClaimTechnicalOneRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toBeUndefined()
  })

  it('returns claim technical one step mutation data', () => {
    const result = getClaimTechnicalGenericStepMutationResult({
      actionName: RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP,
      data: {
        claimTechnicalOneRoleStep: {
          __typename: 'ClaimTechnicalOneRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toStrictEqual({
      __typename: 'ClaimTechnicalOneRoleStepPayload',
      errors: [],
      success: true
    })
  })

  it('returns claim technical two step mutation data', () => {
    const result = getClaimTechnicalGenericStepMutationResult({
      actionName: RoleStepMainActions.CLAIM_TECHNICAL_TWO_ROLE_STEP,
      data: {
        claimTechnicalTwoRoleStep: {
          __typename: 'ClaimTechnicalTwoRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toStrictEqual({
      __typename: 'ClaimTechnicalTwoRoleStepPayload',
      errors: [],
      success: true
    })
  })
})
