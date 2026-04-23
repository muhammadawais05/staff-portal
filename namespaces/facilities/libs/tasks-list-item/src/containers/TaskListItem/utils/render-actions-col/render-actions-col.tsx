import React from 'react'
import { ArrowDownMinor16, ArrowUpMinor16 } from '@toptal/picasso/Icon'
import { Container, Button } from '@toptal/picasso'
import { CancelDisputeButton } from '@staff-portal/tasks'

import StarTaskButton from '../../components/StarTaskButton'
import { TaskColRenderProps } from '../../types'

interface TaskActionsColRenderProps extends TaskColRenderProps {
  toggleTaskExpandRow: () => void
  showDisputeActions: boolean
}

export const renderActionsCol = ({
  task: {
    id,
    starred,
    performer: { id: performerId },
    operations
  },
  isExpandedVisible,
  toggleTaskExpandRow,
  showDisputeActions
}: TaskActionsColRenderProps) => (
  <Container flex direction='row' alignItems='center'>
    <StarTaskButton taskId={id} starred={starred} performerId={performerId} />
    {showDisputeActions && (
      <Container inline>
        <CancelDisputeButton
          taskId={id}
          operation={operations?.cancelTaskDispute ?? undefined}
          type='circular'
        />
      </Container>
    )}

    <Container inline>
      <Button.Circular
        data-testid='task-list-item-expand-button'
        title='expand task'
        variant='flat'
        icon={isExpandedVisible ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
        onClick={toggleTaskExpandRow}
      />
    </Container>
  </Container>
)
