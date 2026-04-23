import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import { hiddenOperationMock } from '~integration/mocks/hidden-operation-mock'

export const getTaskMetaDataResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Task'),
      operations: {
        createActivity: enabledOperationMock(),
        disputeTask: enabledOperationMock(),
        cancelTaskDispute: enabledOperationMock(),
        cancelTask: enabledOperationMock(),
        addTaskComment: enabledOperationMock(),
        changeTaskPriority: hiddenOperationMock(),
        reassignTask: hiddenOperationMock(),
        updateTaskDescription: hiddenOperationMock(),
        rescheduleTask: hiddenOperationMock(),
        scheduleTaskNextCheck: enabledOperationMock(),
        __typename: 'TaskOperations'
      },
      __typename: 'Task'
    }
  }
})
