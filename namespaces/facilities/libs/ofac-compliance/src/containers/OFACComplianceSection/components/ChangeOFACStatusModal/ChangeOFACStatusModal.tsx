import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { NodeType } from '@staff-portal/graphql'
import { DocumentNode, decodeEntityId } from '@staff-portal/data-layer-service'
import { Modal } from '@staff-portal/modals-service'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import { AssociatedRole } from '../../../../types'
import { UpdateRoleOfacStatusDocument } from './data/update-role-ofac-status'
import { UpdateClientOfacStatusDocument } from './data/update-client-ofac-status'
import ChangeOFACStatusModalContent from '../ChangeOFACStatusModalContent'
import { OFAC_UPDATED } from '../../../..'

export interface Props {
  nodeId: string
  fullName: string
  roleOrClientStatus: Maybe<string>
  currentStatus: OfacStatus
  hideModal: () => void
  associatedRoles: Maybe<AssociatedRole[]>
}

const ChangeOFACStatusModal = ({
  nodeId,
  roleOrClientStatus,
  fullName,
  currentStatus,
  hideModal,
  associatedRoles
}: Props) => {
  const emitMessage = useMessageEmitter()

  const { type: nodeType } = decodeEntityId(nodeId)
  const isRole = nodeType !== NodeType.CLIENT

  const initialValues = isRole ? { roleId: nodeId } : { clientId: nodeId }

  const operationName = isRole
    ? 'updateRoleOfacStatus'
    : 'updateClientOfacStatus'

  const mutationDocument = (
    isRole ? UpdateRoleOfacStatusDocument : UpdateClientOfacStatusDocument
  ) as DocumentNode

  const lazyOperationVariables = {
    nodeId,
    nodeType,
    operationName
  } as GetLazyOperationVariables

  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument,
    mutationResultOptions: {
      successNotificationMessage: 'The OFAC Status was successfully changed.',
      onSuccessAction: () => {
        emitMessage(OFAC_UPDATED, { nodeId })
        hideModal()
      }
    },
    errorNotificationMessage:
      'An error occurred, the OFAC status was not changed.'
  })

  return (
    <Modal open onClose={hideModal} operationVariables={lazyOperationVariables}>
      <ChangeOFACStatusModalContent
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        fullName={fullName}
        currentStatus={currentStatus}
        associatedRoles={associatedRoles}
        nodeType={nodeType}
        roleOrClientStatus={roleOrClientStatus}
        submitting={submitting}
        hideModal={hideModal}
      />
    </Modal>
  )
}

export default ChangeOFACStatusModal
