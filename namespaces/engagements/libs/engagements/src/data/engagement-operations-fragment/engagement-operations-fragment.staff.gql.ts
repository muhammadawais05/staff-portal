import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT } from '../engagement-common-actions-operations-fragment'

export const ENGAGEMENT_OPERATIONS_FRAGMENT = gql`
  fragment EngagementOperationsFragment on EngagementOperations {
    restoreCancelledEngagement {
      ...OperationFragment
    }
    restoreExpiredEngagement {
      ...OperationFragment
    }
    restoreRejectedEngagement {
      ...OperationFragment
    }
    approveRejectedEngagementTrial {
      ...OperationFragment
    }
    postponeEngagementExpiration {
      ...OperationFragment
    }
    expireEngagement {
      ...OperationFragment
    }
    cancelEngagementInInterview {
      ...OperationFragment
    }
    rejectEngagementOnInterview {
      ...OperationFragment
    }
    cancelEngagementDraftInInterview {
      ...OperationFragment
    }
    scheduleEngagementActivationStartDate {
      ...OperationFragment
    }
    reactivateEngagement {
      ...OperationFragment
    }
    ...EngagementCommonActionsOperationsFragment
  }

  ${ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
