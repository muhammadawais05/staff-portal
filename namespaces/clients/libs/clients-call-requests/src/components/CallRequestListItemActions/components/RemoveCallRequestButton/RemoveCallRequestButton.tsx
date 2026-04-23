import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import RemoveCallRequestModal from '../RemoveCallRequestModal'

export interface Props {
  callRequestId: string
  callRequestName?: string | null
  disabled?: boolean
}

const RemoveCallRequestButton = ({
  callRequestId,
  callRequestName,
  disabled
}: Props) => {
  const { showModal } = useModal(RemoveCallRequestModal, {
    id: callRequestId,
    fromName: callRequestName
  })

  return (
    <Button
      variant='negative'
      size='small'
      onClick={showModal}
      disabled={disabled}
      data-testid='remove-call-request-button'
    >
      Remove
    </Button>
  )
}

export default RemoveCallRequestButton
