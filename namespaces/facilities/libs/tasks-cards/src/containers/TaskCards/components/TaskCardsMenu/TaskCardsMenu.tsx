import React from 'react'

import {
  TaskCardConfig,
  TaskCardConfigGroup,
  TaskCardConfigGroupOrItem
} from '../../types'
import { isTaskCardGroup } from '../../utils/task-card'
import TaskCardSidebar from '../TaskCardSidebar'

type ActiveTaskCardInfo = {
  activeTaskCardId: string
  setActiveTaskCard: (taskCard: TaskCardConfig) => void
}

const renderTaskCard = ({
  taskCard,
  activeTaskCardId,
  setActiveTaskCard
}: { taskCard: TaskCardConfig } & ActiveTaskCardInfo) => {
  const { entityId, title, subtitle } = taskCard

  return (
    <TaskCardSidebar.Item
      key={entityId}
      selected={entityId === activeTaskCardId}
      onClick={() => setActiveTaskCard(taskCard)}
      title={title}
      subtitle={subtitle}
    />
  )
}
const renderTaskCardGroup = ({
  taskCardGroup: { type, title, taskCards },
  ...rest
}: {
  taskCardGroup: TaskCardConfigGroup
} & ActiveTaskCardInfo) => (
  <TaskCardSidebar.Item
    key={type}
    collapsible
    title={title}
    menu={
      <TaskCardSidebar.Menu>
        {taskCards.map(taskCard => renderTaskCard({ taskCard, ...rest }))}
      </TaskCardSidebar.Menu>
    }
  />
)

export interface Props extends ActiveTaskCardInfo {
  taskCards: TaskCardConfigGroupOrItem[]
}

const TaskCardsMenu = ({ taskCards, ...rest }: Props) => (
  <TaskCardSidebar>
    <TaskCardSidebar.Menu data-testid='task-card-sidebar-menu'>
      {taskCards.map(item =>
        isTaskCardGroup(item)
          ? renderTaskCardGroup({ taskCardGroup: item, ...rest })
          : renderTaskCard({ taskCard: item, ...rest })
      )}
    </TaskCardSidebar.Menu>
  </TaskCardSidebar>
)

export default TaskCardsMenu
