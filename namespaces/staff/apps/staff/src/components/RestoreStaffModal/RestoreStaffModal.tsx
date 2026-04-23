import React, { useCallback } from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { ReactivateStaffDocument } from './data/reactivate-staff/reactivate-staff.staff.gql.types'
import { RestoreStaffModalContent } from './components'
import { STAFF_UPDATED } from '../../messages'

interface Props {
  fullName: string
  staffId: string
  hideModal: () => void
}

const RestoreStaffModal = ({ staffId, hideModal, fullName }: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleSubmit, loading: submitLoading } = useModalFormChangeHandler({
    mutationDocument: ReactivateStaffDocument,
    mutationResultOptions: {
      onSuccessAction: () => {
        hideModal()
        emitMessage(STAFF_UPDATED, { staffId })
      },
      successNotificationMessage: `The Staff account for ${fullName} was successfully restored.`
    }
  })

  const handleModalSubmit = useCallback(
    () =>
      handleSubmit({
        staffId
      }),
    [staffId, handleSubmit]
  )

  return (
    <PromptModal
      loading={submitLoading}
      open={true}
      onClose={hideModal}
      title={`Restore ${fullName}?`}
      message={<RestoreStaffModalContent fullName={fullName} />}
      submitText='Restore'
      variant='positive'
      onSubmit={handleModalSubmit}
      operationVariables={{
        nodeId: staffId,
        nodeType: NodeType.STAFF,
        operationName: 'reactivateStaff'
      }}
    />
  )
}

export default RestoreStaffModal
