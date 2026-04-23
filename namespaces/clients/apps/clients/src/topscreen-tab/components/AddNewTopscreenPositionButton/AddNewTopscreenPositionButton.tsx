import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationFragment } from '@staff-portal/operations'

import { useAddNewTopscreenPositionModal } from '../../../modals/components/AddNewTopscreenPositionModal/hooks/use-add-new-topscreen-position-modal'

interface Props {
  topscreenClientId: string
  operation?: OperationFragment
}

const AddNewTopscreenPositionButton = ({
  topscreenClientId,
  operation
}: Props) => {
  const { showModal: showAddNewTopscreenPositionModal } =
    useAddNewTopscreenPositionModal({
      topscreenClientId
    })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          onClick={showAddNewTopscreenPositionModal}
          data-testid='add-new-topcreen-position-modal-button'
        >
          Add New TopScreen Position
        </Button>
      )}
    />
  )
}

export default AddNewTopscreenPositionButton
