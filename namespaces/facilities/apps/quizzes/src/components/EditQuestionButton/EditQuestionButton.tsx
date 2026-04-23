import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import EditQuestionModal from '../EditQuestionModal'

interface Props {
  question: TalentQuizQuestion
}

const EditQuestionButton = ({ question }: Props) => {
  const {
    operations: { updateTalentQuizQuestion }
  } = question
  const { showModal } = useModal(EditQuestionModal, { question })

  return (
    <Operation
      operation={updateTalentQuizQuestion}
      render={disabled => (
        <Button
          data-testid={`EditQuestionButton-${question.id}`}
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
        >
          Edit
        </Button>
      )}
    />
  )
}

export default EditQuestionButton
