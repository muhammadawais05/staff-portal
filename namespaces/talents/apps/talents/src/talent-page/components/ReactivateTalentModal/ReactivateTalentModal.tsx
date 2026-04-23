import React from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { ReactivateTalentDocument } from './data'

export interface Props {
  talentId: string
  fullName: string
  talentType: string
  hideModal: () => void
}

const ReactivateTalentModal = ({
  talentId,
  fullName,
  talentType,
  hideModal
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ReactivateTalentDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `${talentType} profile was restored`,
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        },
        onSuccessAction: hideModal
      },
      errorNotificationMessage: `An error occurred, the ${talentType} profile was not restored.`
    })

  const handleSubmit = (comment = '') =>
    handleMutationSubmit({ talentId, comment })

  return (
    <ConfirmationModal
      loading={loading}
      variant='negative'
      required
      label='Comment'
      textFieldName='comment'
      title={`Restore ${talentType} ${fullName}`}
      submitText={`Restore ${talentType}`}
      message='Do you really want to reactivate this profile?'
      placeholder='Please specify a reason.'
      onSubmit={handleSubmit}
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'reactivateTalent'
      }}
    />
  )
}

export default ReactivateTalentModal
