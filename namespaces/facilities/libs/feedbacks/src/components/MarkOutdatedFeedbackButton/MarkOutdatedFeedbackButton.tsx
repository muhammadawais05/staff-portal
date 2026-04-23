import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { MarkOutdatedFeedbackModal } from './components'

export interface Props {
  feedbackId: string
  operation: OperationType
  onCompleted: () => void
}

const MarkOutdatedFeedbackButton = ({
  feedbackId,
  operation,
  onCompleted
}: Props) => {
  const { showModal } = useModal(MarkOutdatedFeedbackModal, {
    feedbackId,
    onCompleted
  })

  return (
    <>
      <Operation
        inline={false}
        operation={operation}
        render={disabled => (
          <Button
            variant='secondary'
            size='small'
            disabled={disabled}
            onClick={showModal}
            data-testid='mark-outdated-feedback-button'
          >
            Mark Outdated
          </Button>
        )}
      />
    </>
  )
}

export default MarkOutdatedFeedbackButton
