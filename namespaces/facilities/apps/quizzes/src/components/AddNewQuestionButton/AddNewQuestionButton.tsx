import React from 'react'
import { Button, SkeletonLoader } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, useGetUserQueryOperations } from '@staff-portal/operations'

import AddNewQuestionModal from '../AddNewQuestionModal'

const AddNewQuestionButton = () => {
  const { data: userOperations, loading } = useGetUserQueryOperations()
  const { showModal } = useModal(AddNewQuestionModal, {})

  if (loading) {
    return <SkeletonLoader.Button size='small' />
  }

  return (
    <Operation
      operation={userOperations?.createTalentQuizQuestion}
      render={disabled => (
        <Button
          data-testid='AddNewQuestionButton'
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={showModal}
        >
          Add New Question
        </Button>
      )}
    />
  )
}

export default AddNewQuestionButton
