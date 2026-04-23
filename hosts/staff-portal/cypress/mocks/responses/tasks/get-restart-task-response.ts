import { Task, PlaybookTemplate } from '@staff-portal/graphql/staff'

import { getTaskMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'

type Props = {
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
}

export const getRestartTaskResponse = ({
  task,
  playbookTemplate
}: Props = {}) => ({
  data: {
    restartTask: successMutationMock({
      __typename: 'RestartTaskPayload',
      task: getTaskMock({ task, playbookTemplate })
    })
  }
})
