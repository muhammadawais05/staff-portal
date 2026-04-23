import {
  Activity,
  Task,
  PlaybookTemplate,
  Subject
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTaskMock } from '~integration/mocks/fragments'

type Props = {
  activity?: Partial<Activity>
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
  subjects?: Partial<Subject[]>
}

export const getTasksListResponse = ({
  activity,
  task,
  playbookTemplate,
  subjects
}: Props = {}) => ({
  data: {
    tasks: {
      edges: [
        {
          group: {
            id: encodeEntityId('123', 'TaskGroup'),
            name: 'All',
            __typename: 'TaskGroup'
          },
          node: getTaskMock({ activity, task, playbookTemplate, subjects }),
          __typename: 'TaskConnectionEdge'
        }
      ],
      totalCount: 1,
      __typename: 'TaskConnection'
    }
  }
})
