import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import CreateFeedbackClientAnswersModal from '../CreateFeedbackClientAnswersModal'

export interface Props {
  feedbackId: string
  initialOperation: OperationType
}

const CreateFeedbackClientAnswersButton = ({
  feedbackId,
  initialOperation
}: Props) => {
  const { showModal } = useModal(CreateFeedbackClientAnswersModal, {
    feedbackId
  })

  return (
    <Operation
      operation={initialOperation}
      render={disabled => (
        <Button
          size='small'
          disabled={disabled}
          variant='secondary'
          onClick={showModal}
          data-testid='CreateFeedbackClientAnswersButton'
        >
          Leave Feedback
        </Button>
      )}
    />
  )
}

export default CreateFeedbackClientAnswersButton
