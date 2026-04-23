import { IndicatorProps } from '@toptal/picasso'
import {
  PlaybookTemplatePriority,
  TaskPriorityLevel
} from '@staff-portal/graphql/staff'
import { palette } from '@toptal/picasso-provider'

export const TASKS_DEFAULT_PAGE_SIZE = 50
export const TASK_ICON_BASE_SIZE = 40

export const TASK_PRIORITY_OPTIONS = [
  { value: TaskPriorityLevel.LOW, text: 'Low' },
  { value: TaskPriorityLevel.MEDIUM, text: 'Medium' },
  { value: TaskPriorityLevel.HIGH, text: 'High' }
]

export const TASK_PRIORITY_TEXT_MAPPING: Record<TaskPriorityLevel, string> = {
  [TaskPriorityLevel.HIGH]: 'High Priority',
  [TaskPriorityLevel.MEDIUM]: 'Medium Priority',
  [TaskPriorityLevel.LOW]: 'Low Priority'
}

export const TASK_PRIORITY_COLOR_MAPPING: Record<
  TaskPriorityLevel,
  IndicatorProps['color']
> = {
  [TaskPriorityLevel.HIGH]: 'red',
  [TaskPriorityLevel.MEDIUM]: 'yellow',
  [TaskPriorityLevel.LOW]: 'blue'
}

export const PLAYBOOK_TEMPLATE_PRIORITY_COLOR_MAPPING: Record<
  PlaybookTemplatePriority,
  string
> = {
  [PlaybookTemplatePriority.HIGH]: palette.red.main,
  [PlaybookTemplatePriority.MEDIUM]: palette.yellow.main,
  [PlaybookTemplatePriority.LOW]: palette.blue.main
}
