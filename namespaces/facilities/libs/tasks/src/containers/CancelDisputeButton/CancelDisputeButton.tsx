import React from 'react'
import {
  Button,
  CloseMinor16,
  Tooltip,
  Container,
  ExclamationSolid16
} from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { REFETCH_TASKS, CLOSE_EXPANDED_TASK } from '../../messages'
import CancelDisputeModal from './components/CancelDisputeModal'

export interface Props {
  taskId: string
  type?: 'circular' | 'button_with_exclamation'
  operation?: OperationType
}

const CancelDisputeButton = ({
  taskId,
  operation,
  type = 'circular'
}: Props) => {
  const emitMessage = useMessageEmitter()

  const { showModal } = useModal(CancelDisputeModal, {
    taskId,
    onCancelDispute: () => {
      emitMessage(REFETCH_TASKS)
      emitMessage(CLOSE_EXPANDED_TASK)
    }
  })

  if (type === 'button_with_exclamation') {
    return (
      <Operation
        operation={operation}
        render={disabled => (
          <>
            <ExclamationSolid16 />
            <Container left='small'>
              <Button
                variant='secondary'
                size='small'
                disabled={disabled}
                onClick={showModal}
                data-testid='cancel-dispute-button'
              >
                Cancel Dispute
              </Button>
            </Container>
          </>
        )}
      />
    )
  }

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Tooltip delay='long' content='Cancel Dispute'>
          <Button.Circular
            disabled={disabled}
            variant='flat'
            icon={<CloseMinor16 />}
            onClick={showModal}
          />
        </Tooltip>
      )}
    />
  )
}

export default CancelDisputeButton
