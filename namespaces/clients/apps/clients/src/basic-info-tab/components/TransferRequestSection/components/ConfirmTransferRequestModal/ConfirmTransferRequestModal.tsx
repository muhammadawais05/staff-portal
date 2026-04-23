import React from 'react'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

const ConfirmTransferRequestModalContent = lazy(
  () =>
    import(
      '../ConfirmTransferRequestModalContent/ConfirmTransferRequestModalContent'
    )
)

export const MODAL_TITLE = 'Confirm Transfer Request'

type Props = {
  hideModal: () => void
  requestedTransferId: string
  transferRequestid: string
  companyId: string
  scope: RoleV2Scope
}

const ConfirmTransferRequestModal = ({
  hideModal,
  requestedTransferId,
  transferRequestid,
  companyId,
  scope
}: Props) => (
  <Modal
    open
    size='small'
    onClose={hideModal}
    operationVariables={{
      nodeId: transferRequestid,
      nodeType: NodeType.CLIENT_TRANSFER_ROLE_REQUEST,
      operationName: 'confirmClientTransferRoleRequest'
    }}
    defaultTitle={MODAL_TITLE}
  >
    <ConfirmTransferRequestModalContent
      hideModal={hideModal}
      requestedTransferId={requestedTransferId}
      transferRequestid={transferRequestid}
      companyId={companyId}
      scope={scope}
    />
  </Modal>
)

export default ConfirmTransferRequestModal
