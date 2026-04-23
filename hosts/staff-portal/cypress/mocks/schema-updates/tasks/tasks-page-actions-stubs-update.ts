import { Task, PlaybookTemplate } from '@staff-portal/graphql/staff'

import { successMutationMock } from '~integration/mocks/mutations'
import { tasksPageStubs } from '~integration/mocks/request-stubs'
import {
  getFinishTaskResponse,
  getRestartTaskResponse
} from '~integration/mocks/responses'

type Props = {
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
}

const updateTasksPageActionsStubs = ({
  task,
  playbookTemplate
}: Props = {}) => {
  cy.stubGraphQLRequests({
    ...tasksPageStubs({ task, playbookTemplate }),
    CreateTask: {
      data: {
        createTask: successMutationMock({ __typename: 'CreateTaskPayload' })
      }
    },
    FinishTask: getFinishTaskResponse({ task, playbookTemplate }),
    RestartTask: getRestartTaskResponse({ task, playbookTemplate })
  })
}

export default updateTasksPageActionsStubs
