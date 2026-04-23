import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'

import { useEnableMobileAppSubmit } from './hooks'

export interface Props {
  companyId: string
  hideModal: () => void
}

const EnableMobileAppModal = ({ companyId, hideModal }: Props) => {
  const { loading, handleSubmit } = useEnableMobileAppSubmit({
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
      title='Enable Mobile App Access'
      placeholder='Please specify a reason.'
      submitText='Enable'
      textFieldName='comment'
      label='Comment'
    />
  )
}

export default EnableMobileAppModal
