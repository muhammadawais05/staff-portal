import React, { useCallback } from 'react'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { PassOnboardingTalentPrescreeningDocument } from './data'

export interface Props {
  talentId: string
  hideModal: () => void
}

const PassPrescreeningModal = ({ talentId, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: PassOnboardingTalentPrescreeningDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage:
          'The applicant successfully passed their prescreening.',
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    (comment = '') => handleMutationSubmit({ talentId, comment }),
    [handleMutationSubmit, talentId]
  )

  return (
    <ConfirmationModal
      required
      loading={loading}
      variant='positive'
      label='Comment'
      message="Do you want to pass the applicant's prescreening?"
      textFieldName='comment'
      title='Pass Prescreening'
      submitText='Pass Prescreening'
      placeholder='Please specify a reason'
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'passOnboardingTalentPrescreening'
      }}
      onClose={hideModal}
    />
  )
}

export default PassPrescreeningModal
