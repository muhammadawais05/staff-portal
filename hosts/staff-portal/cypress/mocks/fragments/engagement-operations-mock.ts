import {
  EngagementOperations,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

type ValueReturnType = () => {
  callable: OperationCallableTypes
  messages: string[]
}

type EngagementOperationsMock = Partial<
  Record<keyof Omit<EngagementOperations, '_engagement'>, ValueReturnType>
> & { assignEngagementPurchaseOrderLine: ValueReturnType }

const engagementOperations: EngagementOperationsMock = {
  approveDraftEngagement: hiddenOperationMock,
  approveEngagementTrial: hiddenOperationMock,
  approveRejectedEngagementTrial: hiddenOperationMock,
  assignEngagementPurchaseOrder: hiddenOperationMock,
  assignEngagementPurchaseOrderLine: hiddenOperationMock,
  cancelEngagementDraftInInterview: hiddenOperationMock,
  cancelEngagementInInterview: hiddenOperationMock,
  cancelEngagementTrial: hiddenOperationMock,
  changeEngagementCommitment: hiddenOperationMock,
  changeEngagementEndDate: hiddenOperationMock,
  changeEngagementStartDate: hiddenOperationMock,
  changeEngagementTrialLength: hiddenOperationMock,
  editEngagementCommitment: hiddenOperationMock,
  expireEngagement: hiddenOperationMock,
  importContractAsTop: hiddenOperationMock,
  importTop: hiddenOperationMock,
  postponeEngagementExpiration: hiddenOperationMock,
  proposeEngagementEnd: hiddenOperationMock,
  reactivateEngagement: hiddenOperationMock,
  rejectApprovedEngagementTrial: hiddenOperationMock,
  rejectDraftEngagement: hiddenOperationMock,
  rejectEngagementOnInterview: hiddenOperationMock,
  rejectEngagementTrial: hiddenOperationMock,
  reopenExpiredEngagement: hiddenOperationMock,
  restoreCancelledEngagement: hiddenOperationMock,
  restoreExpiredEngagement: hiddenOperationMock,
  restoreRejectedEngagement: hiddenOperationMock,
  revertEngagementTrialToActive: hiddenOperationMock,
  scheduleEngagementActivationStartDate: hiddenOperationMock,
  scheduleEngagementBreak: hiddenOperationMock,
  sendEngagementTalentIntroductionTestEmail: hiddenOperationMock,
  sendSemiMonthlyEngagementPaymentsAgreement: hiddenOperationMock,
  sendTop: hiddenOperationMock,
  terminateEngagement: hiddenOperationMock,
  updateEngagementExtraHoursEnabled: hiddenOperationMock,
  updateEngagementWeeklyHours: hiddenOperationMock,
  changeProductBillingFrequency: hiddenOperationMock
}

type EngagementOperationsType = typeof engagementOperations

export type EngagementOperationType = {
  [key in keyof typeof engagementOperations]?: ValueReturnType
}

export const engagementOperationsMock = (
  operation?: Partial<EngagementOperationsType>
): EngagementOperationsType => ({
  ...engagementOperations,
  ...operation
})
