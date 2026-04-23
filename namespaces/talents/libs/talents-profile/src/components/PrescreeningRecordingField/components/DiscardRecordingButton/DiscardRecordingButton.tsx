import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation, OperationType } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import DiscardRecordingModal from '../DiscardRecordingModal'

export type Props = {
  talentId: string
  operation: OperationType
}

export const DiscardRecordingButton = ({ talentId, operation }: Props) => {
  const { showModal } = useModal(DiscardRecordingModal, {
    talentId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          onClick={showModal}
          disabled={disabled}
        >
          Discard Recording
        </Button>
      )}
    />
  )
}

export default DiscardRecordingButton
