import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useRestoreOnboardingTalent } from './data'

export interface Props {
  talentId: string
  hideModal: () => void
  onSendEmail: (emailTemplateId?: string) => void
}

const RestoreOnboardingModal = ({
  talentId,
  hideModal,
  onSendEmail
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [restoreOnboarding, { loading }] = useRestoreOnboardingTalent({
    onCompleted: data => {
      if (data.restoreOnboardingTalent?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    },
    onError: () =>
      showError('An error occurred, cannot restore the onboarding process.')
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await restoreOnboarding({
      variables: {
        input: {
          talentId,
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.restoreOnboardingTalent,
      successNotificationMessage:
        'Application has been restored. The talent was notified about the missing application details.',
      onSuccessAction: () =>
        onSendEmail(data?.restoreOnboardingTalent?.emailTemplate?.id)
    })
  }

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'restoreOnboardingTalent'
      }}
      required
      loading={loading}
      variant='positive'
      label='Comment'
      textFieldName='comment'
      title='Restore Onboarding'
      message="Do you really want to restore the applicant's onboarding process?"
      submitText='Restore'
      placeholder='Please specify a reason'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default RestoreOnboardingModal
