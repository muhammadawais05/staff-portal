import { Task } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import { enabledOperationMock } from '~integration/mocks'
import {
  getTaskTagsResponse,
  getTaskWatchersResponse
} from '~integration/mocks/responses'
import sharedCardTaskStubs from './shared-card-task-stubs'

const updateDetailsCardTaskStubs = () => {
  const task = {
    subjects: { nodes: [], __typename: 'SubjectConnection' }
  } as unknown as Task

  cy.stubGraphQLRequests({
    ...sharedCardTaskStubs({ task }),
    GetTaskTags: getTaskTagsResponse(),
    GetTaskWatchers: getTaskWatchersResponse(),
    AddTaskComment: {
      data: {
        addTaskComment: successMutationMock({
          __typename: 'AddTaskCommentPayload'
        })
      }
    },
    CancelTask: {
      data: {
        cancelTask: successMutationMock({ __typename: 'CancelTaskPayload' })
      }
    },
    CancelTaskDispute: {
      data: {
        cancelTaskDispute: successMutationMock({
          __typename: 'CancelTaskDisputePayload'
        })
      }
    },
    ScheduleTaskNextCheck: {
      data: {
        scheduleTaskNextCheck: successMutationMock({
          __typename: 'ScheduleTaskNextCheckPayload',
          task
        })
      }
    },
    DisputeTask: {
      data: {
        disputeTask: successMutationMock({ __typename: 'DisputeTaskPayload' })
      }
    },
    GetLazyOperation: () => ({
      data: {
        node: {
          id: encodeEntityId('123', 'Task'),
          operations: {
            cancelTask: enabledOperationMock(),
            cancelTaskDispute: enabledOperationMock(),
            scheduleTaskNextCheck: enabledOperationMock(),
            disputeTask: enabledOperationMock(),
            __typename: 'TaskOperations'
          },
          __typename: 'Task'
        }
      }
    })
  })
}

export default updateDetailsCardTaskStubs
