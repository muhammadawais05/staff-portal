import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { EngagementOperationsFragment } from '../engagement-operations-fragment'
import { EngagementCommonActionsOperationsFragment } from './engagement-common-actions-operations-fragment.staff.gql.types'

export const createEngagementCommonActionsOperationsMock =
  (): EngagementCommonActionsOperationsFragment => ({
    sendTop: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    importTop: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    importContractAsTop: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    changeEngagementCommitment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    changeEngagementStartDate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    changeEngagementEndDate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    changeProductBillingFrequency: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    scheduleEngagementBreak: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    approveEngagementTrial: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectEngagementTrial: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectApprovedEngagementTrial: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    cancelEngagementTrial: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    reopenExpiredEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    revertEngagementTrialToActive: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    terminateEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    reactivateEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  })

export const createEngagementOperationsFragmentMock =
  (): EngagementOperationsFragment => ({
    restoreCancelledEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    restoreExpiredEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    restoreRejectedEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    approveRejectedEngagementTrial: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    expireEngagement: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    postponeEngagementExpiration: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    cancelEngagementInInterview: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectEngagementOnInterview: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    cancelEngagementDraftInInterview: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    scheduleEngagementActivationStartDate: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    ...createEngagementCommonActionsOperationsMock()
  })
