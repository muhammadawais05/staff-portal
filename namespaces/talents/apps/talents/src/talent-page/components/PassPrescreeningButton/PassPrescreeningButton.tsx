import { Button } from '@toptal/picasso'
import React from 'react'
import { useModal } from '@staff-portal/modals-service'

import PassPrescreeningModal from '../PassPrescreeningModal'

type Props = {
  talentId: string
  disabled?: boolean
}

const PassPrescreeningButton = ({ talentId, disabled }: Props) => {
  const { showModal } = useModal(PassPrescreeningModal, { talentId })

  return (
    <Button
      size='small'
      variant='secondary'
      disabled={disabled}
      onClick={showModal}
      data-testid='pass-prescreening-button'
    >
      Pass Prescreening
    </Button>
  )
}

export default PassPrescreeningButton
