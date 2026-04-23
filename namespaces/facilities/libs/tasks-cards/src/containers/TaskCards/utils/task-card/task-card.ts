import {
  TaskCardConfigGroup,
  TaskCardConfig,
  TaskCardConfigGroupOrItem
} from '../../types'

export const isTaskCard = (
  item: TaskCardConfigGroupOrItem
): item is TaskCardConfig => 'entityId' in item

export const isTaskCardGroup = (
  item: TaskCardConfigGroupOrItem
): item is TaskCardConfigGroup => !isTaskCard(item)
