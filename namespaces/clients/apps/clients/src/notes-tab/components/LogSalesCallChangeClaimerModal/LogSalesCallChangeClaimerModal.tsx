import { PromptModal } from '@toptal/picasso'
import React from 'react'

export interface Props {
  clientName: string
  onCompleted: () => void
  hideModal?: () => void
}

const LogSalesCallChangeClaimerModal = ({
  clientName,
  onCompleted,
  hideModal
}: Props) => (
  <PromptModal
    open
    title="Change Company's Claimer?"
    message={`By adding a sales note to ${clientName}, this company will be assigned to you and you will be responsible for managing it going forward. Are you sure you want to continue?`}
    submitText='OK'
    onSubmit={onCompleted}
    onClose={hideModal}
  />
)

export default LogSalesCallChangeClaimerModal
