import { Engagement, EngagementOperations } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getEngagementOperations = (
  operations?: Partial<EngagementOperations>
): WithTypename<EngagementOperations> => ({
  __typename: 'EngagementOperations',
  _engagement: {} as Engagement,
  approveDraftEngagement: hiddenOperationMock(),
  approveEngagementTrial: hiddenOperationMock(),
  approveRejectedEngagementTrial: hiddenOperationMock(),
  assignEngagementPurchaseOrder: hiddenOperationMock(),
  assignEngagementPurchaseOrderLine: hiddenOperationMock(),
  cancelEngagementDraftInInterview: hiddenOperationMock(),
  cancelEngagementInInterview: hiddenOperationMock(),
  cancelEngagementTrial: hiddenOperationMock(),
  changeEngagementCommitment: hiddenOperationMock(),
  changeEngagementEndDate: hiddenOperationMock(),
  changeEngagementStartDate: hiddenOperationMock(),
  changeEngagementTrialLength: hiddenOperationMock(),
  changeProductBillingFrequency: hiddenOperationMock(),
  deleteStaleDraftTalentPitch: hiddenOperationMock(),
  editEngagementCommitment: hiddenOperationMock(),
  expireEngagement: hiddenOperationMock(),
  importContractAsTop: hiddenOperationMock(),
  importTop: hiddenOperationMock(),
  postponeEngagementExpiration: hiddenOperationMock(),
  proposeEngagementEnd: hiddenOperationMock(),
  reactivateEngagement: hiddenOperationMock(),
  rejectApprovedEngagementTrial: hiddenOperationMock(),
  rejectDraftEngagement: hiddenOperationMock(),
  rejectEngagementOnInterview: hiddenOperationMock(),
  rejectEngagementTrial: hiddenOperationMock(),
  reopenExpiredEngagement: hiddenOperationMock(),
  restoreCancelledEngagement: hiddenOperationMock(),
  restoreExpiredEngagement: hiddenOperationMock(),
  restoreRejectedEngagement: hiddenOperationMock(),
  revertEngagementTrialToActive: hiddenOperationMock(),
  scheduleEngagementActivationStartDate: hiddenOperationMock(),
  scheduleEngagementBreak: hiddenOperationMock(),
  sendEngagementTalentIntroductionTestEmail: hiddenOperationMock(),
  sendSemiMonthlyEngagementPaymentsAgreement: hiddenOperationMock(),
  sendTop: hiddenOperationMock(),
  terminateEngagement: hiddenOperationMock(),
  updateEngagementExtraHoursEnabled: hiddenOperationMock(),
  updateEngagementWeeklyHours: hiddenOperationMock(),
  ...operations
})
