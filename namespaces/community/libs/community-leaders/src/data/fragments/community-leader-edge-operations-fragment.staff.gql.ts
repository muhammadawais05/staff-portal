import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const COMMUNITY_LEADER_EDGE_OPERATIONS_FRAGMENT = gql`
  fragment CommunityLeaderEdgeOperationsFragment on CommunityLeaderAccount {
    operations {
      appointCommunityLeader {
        ...OperationFragment
      }
      updateCommunityLeader {
        ...OperationFragment
      }
      rejectCommunityLeaderApplication {
        ...OperationFragment
      }
      removeCommunityLeader {
        ...OperationFragment
      }
      approveCommunityLeaderApplication {
        ...OperationFragment
      }
      restoreCommunityLeader {
        ...OperationFragment
      }
      holdCommunityLeaderApplication {
        ...OperationFragment
      }
      featureCommunityLeader {
        ...OperationFragment
      }
      unfeatureCommunityLeader {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
