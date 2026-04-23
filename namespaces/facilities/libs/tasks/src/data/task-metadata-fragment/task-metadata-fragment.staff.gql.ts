import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const TASK_METADATA_FRAGMENT = gql`
  fragment TaskMetadataFragment on Task {
    operations {
      disputeTask {
        ...OperationFragment
      }
      cancelTaskDispute {
        ...OperationFragment
      }
      cancelTask {
        ...OperationFragment
      }
      addTaskComment {
        ...OperationFragment
      }
      createActivity {
        ...OperationFragment
      }

      changeTaskPriority {
        ...OperationFragment
      }
      reassignTask {
        ...OperationFragment
      }
      updateTaskDescription {
        ...OperationFragment
      }
      rescheduleTask {
        ...OperationFragment
      }

      scheduleTaskNextCheck {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`
