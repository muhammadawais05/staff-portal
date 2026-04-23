import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { DisableEmbeddedSigningInput } from '@staff-portal/graphql/staff'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useDisableEmbeddedSigning } from './data'

export interface Props {
  companyId: string
  hideModal: () => void
}

const DisableEmbeddedSigningModal = ({
  companyId,
  hideModal: onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Embedded Contract Signing could not be disabled')
  }

  const [disableEmbeddedSigning, { loading }] = useDisableEmbeddedSigning({
    onCompleted: data => {
      if (data.disableEmbeddedSigning?.success) {
        onClose()
      }
    },
    onError
  })

  const handleSubmit = async (comment = '') => {
    const input: DisableEmbeddedSigningInput = {
      clientId: companyId,
      comment
    }

    const { data } = await disableEmbeddedSigning({
      variables: { input }
    })

    return handleMutationResult({
      mutationResult: data?.disableEmbeddedSigning,
      successNotificationMessage: `Embedded Contract Signing has been disabled.`
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      required
      variant='positive'
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Disable Embedded Contract Signing'
      submitText='Disable Embedded Signing'
      textFieldName='comment'
      label='Comment'
      message='Do you really want to disable the embedded contract signing for
              this company? This will remove the ability to view and sign
              contracts through client portal.'
    />
  )
}

export default DisableEmbeddedSigningModal
