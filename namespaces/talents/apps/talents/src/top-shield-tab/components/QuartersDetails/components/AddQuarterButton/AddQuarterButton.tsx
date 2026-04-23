import React, { memo } from 'react'
import { Operation, OperationType } from '@staff-portal/operations'
import { CreateTopShieldQuarterModal } from '@staff-portal/talents-top-shield'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'

interface Props {
  id: string
  operation: OperationType
}

const AddQuarterButton = ({ id, operation }: Props) => {
  const { showModal } = useModal(CreateTopShieldQuarterModal, {
    id
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showModal}
          data-testid='addQuarterButton'
        >
          Add Quarter
        </Button>
      )}
    />
  )
}

export default memo(AddQuarterButton)
