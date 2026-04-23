import React from 'react'
import { Button, SkeletonLoader, Container } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, useGetUserQueryOperations } from '@staff-portal/operations'

import CloneQuestionsModal from '../CloneQuestionsModal'

const CloneQuestionsButton = () => {
  const { data: userOperations, loading } = useGetUserQueryOperations()
  const { showModal } = useModal(CloneQuestionsModal, {})

  if (loading) {
    return (
      <Container flex alignItems='center' left='small'>
        <SkeletonLoader.Button size='small' />
      </Container>
    )
  }

  return (
    <Operation
      operation={userOperations?.cloneTalentQuizQuestion}
      render={disabled => (
        <Button
          data-testid='CloneQuestionsButton'
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
        >
          Clone Quizzes
        </Button>
      )}
    />
  )
}

export default CloneQuestionsButton
