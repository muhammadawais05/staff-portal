import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

import { TaskCountersFragment } from '../../pages/TasksList/data/get-tasks-list'
import * as S from './styles'

export interface Props {
  counters?: TaskCountersFragment | null
}

const TasksSummaryBar = ({ counters }: Props) => {
  if (!counters) {
    return null
  }

  const { pending, today, playbook, thisWeek, total } = counters

  return (
    <OverviewBlock.Group blockWidth='narrow' css={S.taskSummaryBar}>
      <OverviewBlock
        css={S.taskSummaryBarItem}
        value={pending}
        variant='label-yellow'
        label='Pending tasks'
      />
      <OverviewBlock
        css={S.taskSummaryBarItem}
        value={today}
        variant='label-yellow'
        label="Today's tasks"
      />
      <OverviewBlock
        css={S.taskSummaryBarItem}
        value={thisWeek}
        variant='label-green'
        label="This week's tasks"
      />
      <OverviewBlock
        css={S.taskSummaryBarItem}
        value={total}
        label='Total tasks'
      />
      <OverviewBlock
        css={S.taskSummaryBarItem}
        value={playbook}
        variant='label-yellow'
        label='Playbook tasks'
      />
    </OverviewBlock.Group>
  )
}

export default TasksSummaryBar
