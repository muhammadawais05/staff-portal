import { TaskSource } from '@staff-portal/graphql/staff'
import { RoleOrClientFragment } from '@staff-portal/facilities'
import { ReactNode } from 'react'

import { TaskFragment } from './data/task-fragment'
import { TaskMetadataFragment } from './data/task-metadata-fragment'

export type TaskCardLayoutContentItem = {
  key: string | number
  label: string
  value: ReactNode
}

export type TaskCardLayoutSummaryItemVariant =
  | 'value-red'
  | 'value-green'
  | 'value-yellow'

export type UserInfo = Pick<RoleOrClientFragment, 'id' | 'fullName'>

export interface TaskCreateData {
  source: TaskSource
  primaryTaskSubjectId?: string
  performer?: UserInfo
}

export interface TaskIconProps {
  scale?: number
  color?: string
}

export type TaskWithOptionalMetadata = TaskFragment &
  Partial<TaskMetadataFragment>
