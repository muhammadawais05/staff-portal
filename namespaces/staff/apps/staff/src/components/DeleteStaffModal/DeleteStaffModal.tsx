import React, { useCallback } from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { DeactivateStaffDocument } from './data/deactivate-staff/deactivate-staff.staff.gql.types'
import { useGetStaffHasPendingTasks } from './data/get-staff-has-pending-tasks/get-staff-has-pending-tasks.staff.gql'
import { DeleteStaffModalContent } from './components'
import { STAFF_UPDATED } from '../../messages'

interface Props {
  staffId: string
  fullName: string
  hideModal: () => void
}

const DeleteStaffModal = ({ staffId, fullName, hideModal }: Props) => {
  const emitMessage = useMessageEmitter()
  const { initialLoading, data } = useGetStaffHasPendingTasks(staffId)
  const { loading, handleSubmit } = useModalFormChangeHandler({
    mutationDocument: DeactivateStaffDocument,
    mutationResultOptions: {
      onSuccessAction: () => {
        hideModal()
        emitMessage(STAFF_UPDATED, { staffId })
      },
      successNotificationMessage: `The Staff account for ${fullName} was successfully deleted.`
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
      initialLoading={initialLoading}
      loading={loading}
      open={true}
      onClose={hideModal}
      title={`Delete ${fullName}?`}
      message={
        <DeleteStaffModalContent
          hasPendingTasks={data?.node?.hasPendingTasks}
          staffId={staffId}
          fullName={fullName}
        />
      }
      submitText='Delete'
      variant='negative'
      operationVariables={{
        nodeId: staffId,
        nodeType: NodeType.STAFF,
        operationName: 'deactivateStaff'
      }}
      onSubmit={handleModalSubmit}
    />
  )
}

export default DeleteStaffModal
