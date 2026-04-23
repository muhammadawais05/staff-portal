import { isTaskCard } from '../task-card'
import { TaskCardType } from '../../enums'
import { TaskCardConfig, TaskCardConfigGroupOrItem } from '../../types'

export const getDefaultTaskCard = (
  taskCards: TaskCardConfigGroupOrItem[],
  defaultTaskCardType?: TaskCardType | null
): TaskCardConfig => {
  const defaultTaskCard =
    taskCards.find(({ type }) => type === defaultTaskCardType) || taskCards[0]

  if (isTaskCard(defaultTaskCard)) {
    return defaultTaskCard
  }

  return defaultTaskCard.taskCards[0]
}
