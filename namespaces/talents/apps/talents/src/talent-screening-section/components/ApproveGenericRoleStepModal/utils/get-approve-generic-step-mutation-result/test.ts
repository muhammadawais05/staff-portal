import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import { getApproveGenericStepMutationResult } from './get-approve-generic-step-mutation-result'

describe('getApproveGenericStepMutationResult', () => {
  it('returns undefined for missing data', () => {
    const result = getApproveGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP
    })

    expect(result).toBeUndefined()
  })

  it('returns undefined for uncovered action name', () => {
    const result = getApproveGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
      data: {
        approvePortfolioRoleStep: {
          __typename: 'ApprovePortfolioRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toBeUndefined()
  })

  it('returns approve portfolio mutation data', () => {
    const result = getApproveGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP,
      data: {
        approvePortfolioRoleStep: {
          __typename: 'ApprovePortfolioRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toStrictEqual({
      __typename: 'ApprovePortfolioRoleStepPayload',
      errors: [],
      success: true
    })
  })

  it('returns approve technical one mutation data', () => {
    const result = getApproveGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_TECHNICAL_ONE_ROLE_STEP,
      data: {
        approveTechnicalOneRoleStep: {
          __typename: 'ApproveTechnicalOneRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toStrictEqual({
      __typename: 'ApproveTechnicalOneRoleStepPayload',
      errors: [],
      success: true
    })
  })

  it('returns approve technical two mutation data', () => {
    const result = getApproveGenericStepMutationResult({
      actionName: RoleStepMainActions.APPROVE_TECHNICAL_TWO_ROLE_STEP,
      data: {
        approveTechnicalTwoRoleStep: {
          __typename: 'ApproveTechnicalTwoRoleStepPayload',
          errors: [],
          success: true
        }
      }
    })

    expect(result).toStrictEqual({
      __typename: 'ApproveTechnicalTwoRoleStepPayload',
      errors: [],
      success: true
    })
  })
})
