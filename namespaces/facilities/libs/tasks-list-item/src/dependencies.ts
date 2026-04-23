import { defineDependency } from '@staff-portal/dependency-injector'

import { TaskCardSubjectOptions } from './containers/TaskListItem/utils/generate-task-cards-from-subjects'

export const TASK_CARD_SUBJECT_OPTIONS =
  defineDependency<TaskCardSubjectOptions>()
