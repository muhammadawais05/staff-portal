import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'

import useChangeSourcerModal from '../../hooks/use-change-sourcer-modal'

export interface Props {
  talentId: string
  operation: OperationType
}

const ChangeSourcerButton = ({ talentId, operation }: Props) => {
  const { showModal } = useChangeSourcerModal({
    talentId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showModal}
          data-testid='change-sourcer-button'
        >
          Change
        </Button>
      )}
    />
  )
}

export default ChangeSourcerButton
