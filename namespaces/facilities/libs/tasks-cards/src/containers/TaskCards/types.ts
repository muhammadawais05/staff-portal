import {
  TaskFragment,
  TaskMetadataFragment,
  TaskWithOptionalMetadata
} from '@staff-portal/tasks'

import { TaskCardType } from './enums'

export * from './enums'

export type TaskWithMetadata = TaskFragment & TaskMetadataFragment

export interface TaskCardConfig {
  type: TaskCardType
  title: string
  subtitle?: string
  entityId: string
}

export interface TaskCardConfigGroup {
  type: TaskCardType
  title: string
  taskCards: TaskCardConfig[]
}

export type TaskCardConfigGroupOrItem = TaskCardConfig | TaskCardConfigGroup

export type TaskCardProps = {
  taskCardConfig: TaskCardConfig
  task: TaskWithOptionalMetadata
}
