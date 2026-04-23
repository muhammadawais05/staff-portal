import {
  Activity,
  Task,
  PlaybookTemplate,
  Subject
} from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getTouchCounterResponse,
  getTasksListResponse,
  getCreateTaskOperationResponse
} from '~integration/mocks/responses'

type Props = {
  activity?: Partial<Activity>
  task?: Partial<Task>
  playbookTemplate?: Partial<PlaybookTemplate>
  subjects?: Partial<Subject[]>
}
export const tasksPageStubs = ({
  activity,
  task,
  playbookTemplate,
  subjects
}: Props = {}): {
  [key: string]: OperationValue
} => ({
  GetTasksList: getTasksListResponse({
    activity,
    task,
    playbookTemplate,
    subjects
  }),
  GetPlaybooks: { data: { playbooks: null } },
  GetFlags: { data: { flags: null } },
  TouchCounter: getTouchCounterResponse(),
  GetCreateTaskOperation: getCreateTaskOperationResponse()
})
