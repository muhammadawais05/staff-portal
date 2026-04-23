import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import ClaimCallRequestModal from '../../../ClaimCallRequestModal'

export interface Props {
  callRequestId: string
  disabled?: boolean
}

const ClaimCallRequestButton = ({ callRequestId, disabled }: Props) => {
  const { showModal } = useModal(ClaimCallRequestModal, {
    callRequestId
  })

  return (
    <Button
      disabled={disabled}
      variant='positive'
      size='small'
      onClick={showModal}
      data-testid='claim-call-request-button'
    >
      Claim
    </Button>
  )
}

export default ClaimCallRequestButton
