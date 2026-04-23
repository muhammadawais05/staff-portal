import { RoleStepMainActions, Maybe } from '@staff-portal/graphql/staff'

import { ApproveTechnicalTwoRoleStepMutation } from '../../data/approve-technical-two-role-step/approve-technical-two-role-step.staff.gql.types'
import { ApproveTechnicalOneRoleStepMutation } from '../../data/approve-technical-one-role-step/approve-technical-one-role-step.staff.gql.types'
import { ApprovePortfolioRoleStepMutation } from '../../data/approve-portfolio-role-step/approve-portfolio-role-step.staff.gql.types'

export const getApproveGenericStepMutationResult = ({
  actionName,
  data
}: {
  actionName: RoleStepMainActions
  data?: Maybe<
    | ApprovePortfolioRoleStepMutation
    | ApproveTechnicalOneRoleStepMutation
    | ApproveTechnicalTwoRoleStepMutation
  >
}) => {
  if (!data) {
    return undefined
  }

  switch (actionName) {
    case RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP:
      return (data as ApprovePortfolioRoleStepMutation)
        ?.approvePortfolioRoleStep
    case RoleStepMainActions.APPROVE_TECHNICAL_ONE_ROLE_STEP:
      return (data as ApproveTechnicalOneRoleStepMutation)
        ?.approveTechnicalOneRoleStep
    case RoleStepMainActions.APPROVE_TECHNICAL_TWO_ROLE_STEP:
      return (data as ApproveTechnicalTwoRoleStepMutation)
        ?.approveTechnicalTwoRoleStep
    default:
      return undefined
  }
}
