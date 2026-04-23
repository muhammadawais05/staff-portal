import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'

import { useDisableMobileAppSubmit } from './hooks'

export interface Props {
  companyId: string
  hideModal: () => void
}

const DisableMobileAppModal = ({ companyId, hideModal }: Props) => {
  const { handleSubmit, loading } = useDisableMobileAppSubmit({
    companyId,
    hideModal
  })

  return (
    <ConfirmationModal
      loading={loading}
      required
      variant='positive'
      onSubmit={handleSubmit}
      onClose={hideModal}
      title='Disable Mobile App Access'
      placeholder='Please specify a reason.'
      submitText='Disable'
      textFieldName='comment'
      label='Comment'
    />
  )
}

export default DisableMobileAppModal
