import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useDeactivateTalent } from './data'

export interface Props {
  talentId: string
  fullName: string
  talentType: string
  hideModal: () => void
}

const DeactivateTalentModal = ({
  talentId,
  fullName,
  talentType,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [deactivateTalent, { loading }] = useDeactivateTalent({
    onError: () =>
      showError(`An error occurred, the ${talentType} profile was not removed.`)
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await deactivateTalent({
      variables: {
        talentId,
        comment
      }
    })

    return handleMutationResult({
      mutationResult: data?.removeTalent,
      successNotificationMessage: `${talentType} was deactivated`,
      onSuccessAction: () => {
        hideModal()
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  return (
    <ConfirmationModal
      loading={loading}
      variant='negative'
      required
      textFieldName='comment'
      label='Comment'
      title={`Deactivate ${talentType} ${fullName}`}
      submitText={`Deactivate ${talentType}`}
      message='Do you really want to deactivate this profile?'
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'removeTalent'
      }}
    />
  )
}

export default DeactivateTalentModal
