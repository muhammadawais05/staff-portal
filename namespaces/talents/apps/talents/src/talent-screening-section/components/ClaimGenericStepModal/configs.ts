import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import { ClaimGenericRoleStepDocument } from './data/claim-generic-role-step/claim-generic-role-step.staff.gql.types'
import { ClaimPortfolioReviewStepDocument } from './data/claim-portfolio-review-step/claim-portfolio-review-step.staff.gql.types'

export const CLAIM_STEP_MUTATION_DOCUMENT_MAPPING = {
  [RoleStepMainActions.CLAIM_ROLE_STEP]: ClaimGenericRoleStepDocument,
  [RoleStepMainActions.CLAIM_PORTFOLIO_ROLE_STEP]:
    ClaimPortfolioReviewStepDocument
}
