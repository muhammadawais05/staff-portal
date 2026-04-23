import { Maybe, RoleStepMainActions } from '@staff-portal/graphql/staff'

import { ClaimTechnicalTwoRoleStepMutation } from '../../data/claim-technical-two-role-step'
import { ClaimTechnicalOneRoleStepMutation } from '../../data/claim-technical-one-role-step'

export const getClaimTechnicalGenericStepMutationResult = ({
  actionName,
  data
}: {
  actionName: RoleStepMainActions
  data?: Maybe<
    ClaimTechnicalOneRoleStepMutation | ClaimTechnicalTwoRoleStepMutation
  >
}) => {
  if (!data) {
    return undefined
  }

  switch (actionName) {
    case RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP:
      return (data as ClaimTechnicalOneRoleStepMutation)
        ?.claimTechnicalOneRoleStep
    case RoleStepMainActions.CLAIM_TECHNICAL_TWO_ROLE_STEP:
      return (data as ClaimTechnicalTwoRoleStepMutation)
        ?.claimTechnicalTwoRoleStep
    default:
      return undefined
  }
}
