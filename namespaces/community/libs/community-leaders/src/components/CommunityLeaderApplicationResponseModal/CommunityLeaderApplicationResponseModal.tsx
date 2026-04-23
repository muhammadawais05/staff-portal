import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'

interface Props {
  hideModal: () => void
  title: string
  loading: boolean
  requireComment: boolean
  onSubmit: (args: { comment: string }) => void
  submitText?: string
  buttonVariant?: 'positive' | 'negative'
}

const CommunityLeaderApplicationResponseModal = ({
  hideModal,
  title,
  loading,
  requireComment,
  onSubmit,
  submitText,
  buttonVariant
}: Props) => {
  const handleSubmit = async (comment = '') => {
    await onSubmit({ comment })

    hideModal()
  }

  return (
    <ConfirmationModal
      variant={buttonVariant ?? 'positive'}
      title={title}
      onClose={hideModal}
      required={requireComment}
      label='Reason'
      placeholder='Provide a reason for your decision'
      loading={loading}
      textFieldName='comment'
      onSubmit={handleSubmit}
      submitText={submitText ?? 'Submit'}
    />
  )
}

export default CommunityLeaderApplicationResponseModal
