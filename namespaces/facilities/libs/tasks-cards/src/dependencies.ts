import { FC } from 'react'
import { defineDependency } from '@staff-portal/dependency-injector'

import { TaskCardType } from './containers/TaskCards/enums'
import { TaskCardProps } from './containers/TaskCards/types'

export const TASK_CARD_COMPONENTS = defineDependency<{
  [TaskCardType.Job]: FC<TaskCardProps>
  [TaskCardType.Company]: FC<TaskCardProps>
  [TaskCardType.Talent]: FC<TaskCardProps>
  [TaskCardType.CommunityEvent]: FC<TaskCardProps>
  [TaskCardType.Payment]: FC<TaskCardProps>
  [TaskCardType.Invoice]: FC<TaskCardProps>
  [TaskCardType.RateChangeRequest]: FC<TaskCardProps>
}>()
