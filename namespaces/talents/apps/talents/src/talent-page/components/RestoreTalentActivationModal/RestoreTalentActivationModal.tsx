import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import ResumeTalentApplicationGenericModal from '../ResumeTalentApplicationGenericModal'
import { RestoreTalentActivationFormData } from '../ResumeTalentApplicationGenericModal/types'
import { useRestoreTalentActivation } from './data'
import { RestoreTalentActivationModalProps as Props } from './types'

const RestoreTalentActivationModal = ({ talentId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const [restoreTalentActivation, { loading }] = useRestoreTalentActivation({
    onError: () =>
      showError('An error occurred, cannot restore talent activation.')
  })

  const handleSubmit = async ({
    comment,
    specializationId
  }: RestoreTalentActivationFormData) => {
    const { data } = await restoreTalentActivation({
      variables: {
        input: {
          talentId,
          comment,
          specializationId
        }
      }
    })

    const successNotificationMessage = 'Application has been restored.'

    return handleMutationResult({
      mutationResult: data?.restoreTalentActivation,
      successNotificationMessage,
      isFormSubmit: true,
      onSuccessAction: () => {
        hideModal?.()
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  return (
    <ResumeTalentApplicationGenericModal
      talentId={talentId}
      onSubmit={handleSubmit}
      isSubmitting={loading}
      hideModal={hideModal}
    />
  )
}

export default RestoreTalentActivationModal
