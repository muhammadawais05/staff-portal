import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React from 'react'
import {
  ConfirmationModal,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useResumeTalent } from './data'

export interface Props extends ModalComponentBaseProps {
  talentId: string
}

const ResumeTalentModal = ({ talentId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const [resumeTalent, { loading }] = useResumeTalent({
    onCompleted: data => {
      if (data.resumeTalent?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
      }
    },
    onError: () =>
      showError('An error occurred, the application was not resumed.')
  })

  const handleSubmit = async (comment = '') => {
    const { data } = await resumeTalent({
      variables: {
        talentId,
        comment
      }
    })

    return handleMutationResult({
      mutationResult: data?.resumeTalent,
      successNotificationMessage: 'Application has been resumed.',
      onSuccessAction: hideModal
    })
  }

  return (
    <ConfirmationModal
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'resumeTalent'
      }}
      loading={loading}
      variant='negative'
      required
      label='Comment'
      textFieldName='comment'
      title='Resume Application'
      submitText='Resume Application'
      message='Do you really want to resume this application?'
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default ResumeTalentModal
