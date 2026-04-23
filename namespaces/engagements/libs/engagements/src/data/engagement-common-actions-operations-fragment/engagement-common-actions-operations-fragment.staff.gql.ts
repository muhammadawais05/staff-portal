import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT = gql`
  fragment EngagementCommonActionsOperationsFragment on EngagementOperations {
    sendTop {
      ...OperationFragment
    }
    importTop {
      ...OperationFragment
    }
    importContractAsTop {
      ...OperationFragment
    }
    changeEngagementCommitment {
      ...OperationFragment
    }
    changeEngagementStartDate {
      ...OperationFragment
    }
    changeEngagementEndDate {
      ...OperationFragment
    }
    changeProductBillingFrequency {
      ...OperationFragment
    }
    scheduleEngagementBreak {
      ...OperationFragment
    }
    approveEngagementTrial {
      ...OperationFragment
    }
    rejectEngagementTrial {
      ...OperationFragment
    }
    rejectApprovedEngagementTrial {
      ...OperationFragment
    }
    cancelEngagementTrial {
      ...OperationFragment
    }
    reopenExpiredEngagement {
      ...OperationFragment
    }
    revertEngagementTrialToActive {
      ...OperationFragment
    }
    terminateEngagement {
      ...OperationFragment
    }
    reactivateEngagement {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`
