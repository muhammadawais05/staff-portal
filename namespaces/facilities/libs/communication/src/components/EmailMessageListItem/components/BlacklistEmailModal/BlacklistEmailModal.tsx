import React from 'react'
import {
  PromptModal,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'

import {
  useEmailAddressBlacklist,
  EmailAddressBlacklistMutation
} from './data/email-address-blacklist'

interface Props extends ModalComponentBaseProps {
  emailAddress: string
}

const BlacklistEmailModal = ({ emailAddress, hideModal }: Props) => {
  const { showSuccess, showError } = useNotifications()

  const handleEmailAddressBlacklistCompleted = (
    data: EmailAddressBlacklistMutation
  ) => {
    if (data.emailAddressBlacklist?.successful) {
      showSuccess('Email was blacklisted.')
      hideModal()
    } else {
      showError('Invalid request, email was not blacklisted.')
    }
  }

  const [addEmailToBlackList, { loading }] = useEmailAddressBlacklist({
    onCompleted: handleEmailAddressBlacklistCompleted,
    onError: () => showError('Error occurred, email was not blacklisted.')
  })

  const handleSubmit = () =>
    addEmailToBlackList({ variables: { address: emailAddress } })

  return (
    <PromptModal
      open
      loading={loading}
      onClose={hideModal}
      onSubmit={handleSubmit}
      title={`Blacklist ${emailAddress}`}
      message={`Are you sure that you want to blacklist ${emailAddress}? This action cannot be reverted.`}
      variant='negative'
      submitText='Blacklist'
      testIds={{ submitButton: 'blacklist-submit-button' }}
    />
  )
}

export default BlacklistEmailModal
