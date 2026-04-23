import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import { ApprovePortfolioRoleStepDocument } from './data/approve-portfolio-role-step/approve-portfolio-role-step.staff.gql.types'
import { ApproveTechnicalOneRoleStepDocument } from './data/approve-technical-one-role-step/approve-technical-one-role-step.staff.gql.types'
import { ApproveTechnicalTwoRoleStepDocument } from './data/approve-technical-two-role-step/approve-technical-two-role-step.staff.gql.types'

export const APPROVE_MUTATION_DOCUMENT_MAPPING = {
  [RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP]:
    ApprovePortfolioRoleStepDocument,
  [RoleStepMainActions.APPROVE_TECHNICAL_ONE_ROLE_STEP]:
    ApproveTechnicalOneRoleStepDocument,
  [RoleStepMainActions.APPROVE_TECHNICAL_TWO_ROLE_STEP]:
    ApproveTechnicalTwoRoleStepDocument
}
