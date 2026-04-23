import { Button } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import CreateFeedbackMatcherAnswersModal from '../CreateFeedbackMatcherAnswersModal'

export interface Props {
  feedbackId: string
  initialOperation: OperationType
}

const CreateFeedbackMatcherAnswersButton = ({
  feedbackId,
  initialOperation
}: Props) => {
  const { showModal } = useModal(CreateFeedbackMatcherAnswersModal, {
    feedbackId
  })

  return (
    <>
      <Operation
        operation={initialOperation}
        render={disabled => (
          <Button
            size='small'
            disabled={disabled}
            variant='secondary'
            onClick={showModal}
            data-testid='CreateFeedbackMatcherAnswersButton'
          >
            Leave Feedback
          </Button>
        )}
      />
    </>
  )
}

export default CreateFeedbackMatcherAnswersButton
