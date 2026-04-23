import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'
import { RejectSpecializationApplicationModal } from '@staff-portal/talents'
import { Button, ButtonVariantType, Container } from '@toptal/picasso'
import React from 'react'

export interface Props {
  talentId: string
  specializationApplicationId: string
  operation?: OperationType
  variant?: ButtonVariantType
}

const RejectApplicationButton = ({
  talentId,
  specializationApplicationId,
  operation,
  variant = 'secondary'
}: Props) => {
  const { showModal } = useModal(RejectSpecializationApplicationModal, {
    talentId,
    specializationApplicationId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Container left='xsmall'>
          <Button
            size='small'
            variant={variant}
            disabled={disabled}
            onClick={showModal}
            data-testid='reject-application-button'
          >
            Reject Application
          </Button>
        </Container>
      )}
    />
  )
}

export default RejectApplicationButton
