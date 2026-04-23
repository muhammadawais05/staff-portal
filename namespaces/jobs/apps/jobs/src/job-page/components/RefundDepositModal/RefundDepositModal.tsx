import React from 'react'
import { PromptModal } from '@toptal/picasso'

import useRefundJobDepositMutation from './hooks/use-refund-deposit-mutation'

type Props = {
  jobId: string
  hideModal: () => void
}

const RefundDepositModal = ({ jobId, hideModal }: Props) => {
  const { handleSubmit } = useRefundJobDepositMutation({
    jobId,
    onCompleted: hideModal
  })

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Refund Deposit'
      message='Initiate deposit refund (creates a task for the accountant)'
      submitText='Refund Deposit'
      variant='negative'
      onSubmit={handleSubmit}
      testIds={{ submitButton: 'RefundDeposit-submit-modal-button' }}
    />
  )
}

export default RefundDepositModal
