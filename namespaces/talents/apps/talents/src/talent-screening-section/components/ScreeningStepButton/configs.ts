import { RoleStepMainActions } from '@staff-portal/graphql/staff'

import { StepActionHook } from '../../types'
import { useApproveEnglishStepModal } from '../ApproveEnglishStepModal'
import { useApproveGenericRoleStepModal } from '../ApproveGenericRoleStepModal'
import { useApproveOnlineTestStepModal } from '../ApproveOnlineTestStepModal'
import { useApprovePaymentStepModal } from '../ApprovePaymentStepModal/hooks/use-approve-payment-modal/use-approve-payment-modal'
import { useApproveWorkHoursStepModal } from '../ApproveWorkHoursStepModal/hooks/use-approve-work-hours-step-modal'
import { useClaimEnglishStepModal } from '../ClaimEnglishStepModal'
import { useClaimGenericRoleStepModal } from '../ClaimGenericStepModal/hooks/use-claim-generic-role-step-modal/use-claim-generic-role-step-modal'
import { useClaimOnlineTestStepModal } from '../ClaimOnlineTestStepModal'
import { useClaimTechnicalGenericStepModal } from '../ClaimTechnicalGenericStepModal'

export const HOOK_MAPPING: Record<RoleStepMainActions, StepActionHook> = {
  [RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP]: useApproveEnglishStepModal,
  [RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP]:
    useApproveGenericRoleStepModal,
  [RoleStepMainActions.APPROVE_TECHNICAL_ONE_ROLE_STEP]:
    useApproveGenericRoleStepModal,
  [RoleStepMainActions.APPROVE_TECHNICAL_TWO_ROLE_STEP]:
    useApproveGenericRoleStepModal,
  [RoleStepMainActions.APPROVE_ONLINE_TEST_ROLE_STEP]:
    useApproveOnlineTestStepModal,
  [RoleStepMainActions.APPROVE_PAYMENT_ROLE_STEP]: useApprovePaymentStepModal,
  [RoleStepMainActions.APPROVE_WORK_HOURS_ROLE_STEP]:
    useApproveWorkHoursStepModal,
  [RoleStepMainActions.CLAIM_ENGLISH_ROLE_STEP]: useClaimEnglishStepModal,
  [RoleStepMainActions.CLAIM_PORTFOLIO_ROLE_STEP]: useClaimGenericRoleStepModal,
  [RoleStepMainActions.CLAIM_ROLE_STEP]: useClaimGenericRoleStepModal,
  [RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP]:
    useClaimTechnicalGenericStepModal,
  [RoleStepMainActions.CLAIM_TECHNICAL_TWO_ROLE_STEP]:
    useClaimTechnicalGenericStepModal,
  [RoleStepMainActions.CLAIM_ONLINE_TEST_ROLE_STEP]: useClaimOnlineTestStepModal
}
