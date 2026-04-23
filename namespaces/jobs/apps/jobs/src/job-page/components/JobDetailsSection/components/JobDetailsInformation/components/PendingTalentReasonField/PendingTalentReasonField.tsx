import React from 'react'
import { Button, Container, TypographyOverflow } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Maybe } from '@staff-portal/graphql/staff'
import { Operation, OperationType } from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'

import PendingReasonModal from '../PendingTalentReasonModal'

interface Props {
  pendingTalentReason?: Maybe<string>
  operation?: OperationType
  jobId: string
}

const PendingTalentReasonField = ({
  pendingTalentReason,
  operation,
  jobId
}: Props) => {
  const { showModal } = useModal(PendingReasonModal, {
    jobId,
    pendingTalentReason
  })

  return (
    <Container flex alignItems='center' justifyContent='space-between'>
      <TypographyOverflow size='medium'>
        {pendingTalentReason || NO_VALUE}
      </TypographyOverflow>
      <Container left='small'>
        <Operation
          operation={operation}
          render={disabled => (
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
          )}
        />
      </Container>
    </Container>
  )
}

export default PendingTalentReasonField
