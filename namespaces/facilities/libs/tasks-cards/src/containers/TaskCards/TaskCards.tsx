import { Container } from '@toptal/picasso'
import React, { FC, Suspense, useState } from 'react'
import { useDependency } from '@staff-portal/dependency-injector'
import { TaskCardLayout, TaskWithOptionalMetadata } from '@staff-portal/tasks'
import { lazy } from '@staff-portal/utils'

import { TASK_CARD_COMPONENTS } from '../../dependencies'
import { TaskCardType } from './enums'
import {
  TaskCardConfig,
  TaskCardConfigGroupOrItem,
  TaskCardProps
} from './types'
import { getDefaultTaskCard } from './utils/get-default-task-card'
import TaskCardsMenu from './components/TaskCardsMenu'
import * as S from './styles'
import DetailsTaskCard from './components/DetailsTaskCard'

export interface Props {
  task: TaskWithOptionalMetadata
  taskCards: TaskCardConfigGroupOrItem[]
  defaultTaskCardType?: TaskCardType | null
}

export interface ActiveTaskCardProps {
  taskCard: TaskCardConfig
  task: TaskWithOptionalMetadata
}

const EmptyTaskCard = () => <>No TASK CARD registered</>

const ActiveTaskCard = ({ taskCard, task }: ActiveTaskCardProps) => {
  const TaskCardComponents = useDependency(TASK_CARD_COMPONENTS)

  const StaticTaskCards = {
    [TaskCardType.TaskDetails]: DetailsTaskCard,
    [TaskCardType.Activity]: lazy(() => import('./components/ActivityTaskCard'))
  }

  const TASK_CARD_TYPE_MAP: Record<
    TaskCardType,
    FC<TaskCardProps>
  > = TaskCardComponents
    ? { ...StaticTaskCards, ...TaskCardComponents }
    : {
        ...StaticTaskCards,
        [TaskCardType.Job]: EmptyTaskCard,
        [TaskCardType.Company]: EmptyTaskCard,
        [TaskCardType.Talent]: EmptyTaskCard,
        [TaskCardType.CommunityEvent]: EmptyTaskCard,
        [TaskCardType.Payment]: EmptyTaskCard,
        [TaskCardType.Invoice]: EmptyTaskCard,
        [TaskCardType.RateChangeRequest]: EmptyTaskCard
      }

  const TaskCardContent = TASK_CARD_TYPE_MAP[taskCard.type]

  return (
    <Suspense fallback={<TaskCardLayout.Loading />}>
      <TaskCardContent taskCardConfig={taskCard} task={task} />
    </Suspense>
  )
}

const TaskCards = ({ task, taskCards, defaultTaskCardType }: Props) => {
  const [activeTaskCard, setActiveTaskCard] = useState(() =>
    getDefaultTaskCard(taskCards, defaultTaskCardType)
  )

  return (
    <Container
      flex
      css={S.taskCardsContainer}
      data-testid='task-cards-container'
    >
      <TaskCardsMenu
        taskCards={taskCards}
        activeTaskCardId={activeTaskCard.entityId}
        setActiveTaskCard={setActiveTaskCard}
      />

      <Container css={S.taskCardContent} padded='small'>
        <ActiveTaskCard taskCard={activeTaskCard} task={task} />
      </Container>
    </Container>
  )
}

export default TaskCards
