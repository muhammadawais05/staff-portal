import { PromptModal } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ImportContractAsTopDocument } from './data/import-contract-as-top/import-contract-as-top.staff.gql.types'
import { ENGAGEMENT_UPDATED } from '../../messages'
import { useNavigateToJobPage } from '../../services'

export type Props = {
  engagementId?: string
  hideModal: () => void
}

const ImportContractAsTopModal = ({ engagementId, hideModal }: Props) => {
  const { navigateToJobPage } = useNavigateToJobPage()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [importContractAsTop] = useMutation(ImportContractAsTopDocument, {
    onError: () => showError('An error occurred, unable to import STA as TOP.')
  })

  if (!engagementId) {
    return null
  }

  const handleSubmit = async () => {
    const { data } = await importContractAsTop({
      variables: { input: { engagementId } }
    })

    return handleMutationResult({
      mutationResult: data?.importContractAsTop,
      successNotificationMessage: 'The STA was successfully imported as TOP.',
      onSuccessAction: () => {
        hideModal()

        const result = navigateToJobPage(
          data?.importContractAsTop?.engagement?.job?.id
        )

        if (!result) {
          emitMessage(ENGAGEMENT_UPDATED, { engagementId })
        }
      }
    })
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Import STA as TOP'
      message="This action will link the company's active Sourced Talent Agreement (STA) to the engagement in place of a Talent Outline Plan (TOP)."
      submitText='Import Contract'
      onSubmit={handleSubmit}
      data-testid='import-contract-as-top-modal'
    />
  )
}

export default ImportContractAsTopModal
