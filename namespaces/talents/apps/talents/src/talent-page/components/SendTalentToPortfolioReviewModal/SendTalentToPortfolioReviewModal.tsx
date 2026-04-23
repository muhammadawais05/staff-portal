import React from 'react'
import { PromptModal } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { ModalComponentBaseProps } from '@staff-portal/modals-service'

import { useSendTalentToPortfolioReview } from './data'

export interface Props extends ModalComponentBaseProps {
  talentId: string
  emailTemplateId?: string
  onSuccess?: () => void
}

const SendTalentToPortfolioReviewModal = ({
  talentId,
  emailTemplateId,
  hideModal,
  onSuccess
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [sendTalentToPortfolioReview] = useSendTalentToPortfolioReview({
    onError: () => {
      showError(
        'An error occurred, the talent was not sent to portfolio review.'
      )
    }
  })
  const handleSubmit = async () => {
    const { data } = await sendTalentToPortfolioReview({
      variables: { input: { talentId, emailTemplateId } }
    })

    return handleMutationResult({
      mutationResult: data?.sendTalentToPortfolioReview,
      successNotificationMessage: 'Talent sent to portfolio review.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
        onSuccess?.()
      }
    })
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Send to Portfolio Review'
      message='Do you want to send the talent to portfolio review?'
      submitText='Send to Portfolio Review'
      onSubmit={handleSubmit}
    />
  )
}

export default SendTalentToPortfolioReviewModal
