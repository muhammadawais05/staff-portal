import React from 'react'
import { Container, Grid } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import {
  CancelDisputeButton,
  TaskWithOptionalMetadata
} from '@staff-portal/tasks'

import TaskPlaybook from '../TaskPlaybook'
import TaskHistory from '../TaskHistory'
import AddCommentForm from '../AddCommentForm'
import TaskTags from '../TaskTags'
import TaskWatchers from '../TaskWatchers'

export interface Props {
  task: TaskWithOptionalMetadata
  historyPollInterval: number
  onCommentAdd: () => void
}

const DetailsTaskCardContent = ({
  task: {
    id: taskId,
    playbookTemplate,
    performer: { id: performerId },
    operations
  },
  historyPollInterval,
  onCommentAdd
}: Props) => {
  return (
    <>
      {playbookTemplate && (
        <Container bottom='small'>
          <TaskPlaybook playbookTemplate={playbookTemplate} />
        </Container>
      )}

      <Container bottom='xsmall'>
        <TaskHistory taskId={taskId} pollInterval={historyPollInterval} />
      </Container>

      <Operation operation={operations?.addTaskComment}>
        <Container bottom='small'>
          <AddCommentForm taskId={taskId} onCommentAdd={onCommentAdd} />
        </Container>
      </Operation>

      <Container>
        <Grid spacing={16}>
          <Grid.Item small={12} medium={6}>
            <TaskTags taskId={taskId} />
          </Grid.Item>
          <Grid.Item small={12} medium={6}>
            <TaskWatchers taskId={taskId} performerId={performerId} />
          </Grid.Item>
        </Grid>
      </Container>

      <Container flex direction='row' top='medium' alignItems='center'>
        <CancelDisputeButton
          taskId={taskId}
          operation={operations?.cancelTaskDispute}
          type='button_with_exclamation'
        />
      </Container>
    </>
  )
}

export default DetailsTaskCardContent
