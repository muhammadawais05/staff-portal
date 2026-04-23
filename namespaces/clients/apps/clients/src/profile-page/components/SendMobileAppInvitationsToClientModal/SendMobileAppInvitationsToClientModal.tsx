import React from 'react'
import { PromptModal } from '@toptal/picasso'

import { useSubmitSendMobileAppInvitationsToClient } from './utils'

interface Props {
  clientId: string
  hideModal: () => void
}

const SendMobileAppInvitationsToClientModal = ({
  clientId,
  hideModal
}: Props) => {
  const { handleSubmit } = useSubmitSendMobileAppInvitationsToClient({
    clientId,
    hideModal
  })

  return (
    <PromptModal
      open
      title='Send Client App invitation email'
      message='Do you want to send a Client App invitation to the main client representative?'
      submitText='Send'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default SendMobileAppInvitationsToClientModal
