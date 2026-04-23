import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { EnableEmbeddedSigningInput } from '@staff-portal/graphql/staff'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useEnableEmbeddedSigning } from './data'

export interface Props {
  companyId: string
  hideModal: () => void
}

const EnableEmbeddedSigningModal = ({
  companyId,
  hideModal: onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Embedded Contract Signing could not be enabled')
  }

  const [enableEmbeddedSigning, { loading }] = useEnableEmbeddedSigning({
    onCompleted: data => {
      if (data.enableEmbeddedSigning?.success) {
        onClose()
      }
    },
    onError
  })

  const handleSubmit = async (comment = '') => {
    const input: EnableEmbeddedSigningInput = {
      clientId: companyId,
      comment
    }

    const { data } = await enableEmbeddedSigning({
      variables: { input }
    })

    return handleMutationResult({
      mutationResult: data?.enableEmbeddedSigning,
      successNotificationMessage: `Embedded Contract Signing has been enabled.`
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      required
      variant='positive'
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Enable Embedded Contract Signing'
      submitText='Enable Embedded Signing'
      textFieldName='comment'
      label='Comment'
      message='Do you really want to enable the embedded contract signing for
              this company? This will allow the company to view and sign
              contracts through client portal.'
    />
  )
}

export default EnableEmbeddedSigningModal
