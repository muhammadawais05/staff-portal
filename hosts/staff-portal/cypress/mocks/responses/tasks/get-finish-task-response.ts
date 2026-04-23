import { Task, PlaybookTemplate } from '@staff-portal/graphql/staff'

import { getTaskMock } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'

type Props = {
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
}

export const getFinishTaskResponse = ({
  task,
  playbookTemplate
}: Props = {}) => ({
  data: {
    finishTask: successMutationMock({
      __typename: 'FinishTaskPayload',
      task: getTaskMock({ task, playbookTemplate })
    })
  }
})
