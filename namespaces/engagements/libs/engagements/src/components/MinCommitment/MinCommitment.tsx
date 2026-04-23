import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { Button, Container, Typography } from '@toptal/picasso'
import React from 'react'

import EditMinCommitmentModal from '../EditMinCommitmentModal'

export interface Props {
  engagementId: string
  operation: OperationType
  minimumHours?: number
}

const MinCommitment = ({
  engagementId,
  operation,
  minimumHours = 0
}: Props) => {
  const { showModal } = useModal(EditMinCommitmentModal, {
    engagementId,
    minimumHours
  })

  return (
    <Container flex justifyContent='space-between'>
      <Typography
        color='red'
        size='medium'
        weight='inherit'
        data-testid='min-commitment-value'
      >
        {minimumHours} hours per week
      </Typography>

      <Operation
        operation={operation}
        render={disabled => (
          <Button
            variant='secondary'
            size='small'
            onClick={showModal}
            disabled={disabled}
            data-testid='min-commitment-edit-button'
          >
            Edit
          </Button>
        )}
      />
    </Container>
  )
}

export default MinCommitment
