import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { ResumeTalentApplicationNextActions } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import ResumeTalentApplicationGenericModal from '../ResumeTalentApplicationGenericModal'
import { ResumeTalentApplicationFormData } from '../ResumeTalentApplicationGenericModal/types'
import { useResumeTalentApplication } from './data'
import { ResumeTalentApplicationModalProps as Props } from './types'
import { useGetResumeTalentApplicationDetails } from '../ResumeTalentApplicationGenericModal/data'

const ResumeTalentApplicationModal = ({
  talentId,
  hideModal,
  onSendToPortfolioReview
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const { applicationManualRestorationAvailable } =
    useGetResumeTalentApplicationDetails(talentId)

  const [resumeTalentApplication, { loading: resumeTalentApplicationLoading }] =
    useResumeTalentApplication({
      onError: () =>
        showError('An error occurred, cannot resume talent application.')
    })

  const handleSubmit = async ({
    comment,
    automatedActionAllowed,
    specializationId
  }: ResumeTalentApplicationFormData) => {
    const { data } = await resumeTalentApplication({
      variables: {
        input: {
          talentId,
          comment,
          automatedActionAllowed: applicationManualRestorationAvailable
            ? !!automatedActionAllowed
            : undefined,
          specializationId
        }
      }
    })

    const successNotificationMessage = `Application has been restored.${
      applicationManualRestorationAvailable && automatedActionAllowed
        ? ' The talent received an invitation to schedule an interview.'
        : ''
    }`

    return handleMutationResult({
      mutationResult: data?.resumeTalentApplication,
      successNotificationMessage,
      isFormSubmit: true,
      onSuccessAction: () => {
        hideModal?.()

        if (
          data?.resumeTalentApplication?.nextAction ===
          ResumeTalentApplicationNextActions.SEND_TALENT_TO_PORTFOLIO_REVIEW
        ) {
          onSendToPortfolioReview?.(
            data.resumeTalentApplication.emailTemplate?.id ?? undefined
          )
        } else {
          emitMessage(TALENT_UPDATED, { talentId })
        }
      }
    })
  }

  return (
    <ResumeTalentApplicationGenericModal
      talentId={talentId}
      isResumeTalentApplicationModal
      onSubmit={handleSubmit}
      hideModal={hideModal}
      isSubmitting={resumeTalentApplicationLoading}
    />
  )
}

export default ResumeTalentApplicationModal
