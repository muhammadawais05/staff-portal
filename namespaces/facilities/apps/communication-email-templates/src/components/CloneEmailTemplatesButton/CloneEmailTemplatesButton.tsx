import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import CloneEmailTemplatesModal from '../CloneEmailTemplatesModal'

const CloneEmailTemplatesButton = () => {
  const { showModal } = useModal(CloneEmailTemplatesModal, {})

  return (
    <Button
      size='small'
      variant='secondary'
      onClick={showModal}
      data-testid='email-templates-page-clone-button'
    >
      Clone Email Templates
    </Button>
  )
}

export default CloneEmailTemplatesButton
