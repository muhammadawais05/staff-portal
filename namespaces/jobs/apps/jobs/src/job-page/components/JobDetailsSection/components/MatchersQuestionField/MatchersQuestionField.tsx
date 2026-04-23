import React from 'react'
import { Typography, Container, Button } from '@toptal/picasso'
import pluralize from 'pluralize'
import { JobPositionQuestion } from '@staff-portal/graphql/staff'
import { Operation, OperationFragment } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { JOB_MATCHERS_QUESTIONS_UPDATED, JOB_UPDATED } from '@staff-portal/jobs'

import MatchersQuestionModal from '../MatchersQuestionModal'

export interface Props {
  jobId: string
  operation: OperationFragment | undefined
  questions?: Partial<JobPositionQuestion>[]
}

const MatchersQuestionField = ({ operation, jobId, questions }: Props) => {
  const emitMessage = useMessageEmitter()
  const { showModal } = useModal(MatchersQuestionModal, {
    jobId,
    onMatchersQuestionsSaved: () => {
      emitMessage(JOB_UPDATED, { jobId })
      emitMessage(JOB_MATCHERS_QUESTIONS_UPDATED, { jobId })
    }
  })

  return (
    <Container flex justifyContent='space-between'>
      <Typography weight='semibold' size='medium'>
        {pluralize('question', questions?.length ?? 0, true)}
      </Typography>

      <Operation
        operation={operation}
        render={disabled => (
          <Container left='small'>
            <Button
              variant='secondary'
              size='small'
              onClick={showModal}
              aria-label='Edit'
              data-testid='edit-button'
              disabled={disabled}
            >
              Edit
            </Button>
          </Container>
        )}
      />
    </Container>
  )
}

export default MatchersQuestionField
