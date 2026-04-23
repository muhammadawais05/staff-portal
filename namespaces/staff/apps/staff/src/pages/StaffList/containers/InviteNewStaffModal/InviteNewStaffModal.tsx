import React, { useMemo } from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { concatMessages, useQuery } from '@staff-portal/data-layer-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { Alert } from '@toptal/picasso'

import InviteNewStaffModalContent from './components/InviteNewStaffModalContent/InviteNewStaffModalContent'
import { InviteNewStaffOperationDocument } from '../InviteNewStaffButton/data/invite-new-staff-operation/invite-new-staff-operation.staff.gql.types'

const title = 'Invite New Staff'

type Props = {
  hideModal: () => void
}

const InviteNewStaffModal = ({ hideModal }: Props) => {
  const { data, loading, error } = useQuery(InviteNewStaffOperationDocument)
  const operation = data?.operations.inviteStaff

  const content = useMemo(() => {
    if (loading) {
      return <ModalSuspender />
    }

    if (!isOperationEnabled(operation)) {
      const errorMessage = concatMessages(operation?.messages) ?? error?.message

      return (
        <>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Content>
            <Alert>{errorMessage}</Alert>
          </Modal.Content>
        </>
      )
    }

    return <InviteNewStaffModalContent title={title} hideModal={hideModal} />
  }, [hideModal, loading, operation, error])

  return (
    <Modal open defaultTitle={title} onClose={hideModal}>
      {content}
    </Modal>
  )
}

export default InviteNewStaffModal
