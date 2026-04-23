import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '../../enabled-operation-mock'

export const getEngagementTalentSectionOperationsResponse = () => ({
  data: {
    node: {
      __typename: 'Engagement',
      id: encodeEntityId('123', 'Engagement'),
      purchaseOrderLine: null,
      operations: {
        changeEngagementTrialLength: enabledOperationMock(),
        updateEngagementExtraHoursEnabled: enabledOperationMock(),
        assignEngagementPurchaseOrder: enabledOperationMock(),
        assignEngagementPurchaseOrderLine: enabledOperationMock(),
        editEngagementCommitment: enabledOperationMock(),
        __typename: 'EngagementOperations'
      }
    }
  }
})
