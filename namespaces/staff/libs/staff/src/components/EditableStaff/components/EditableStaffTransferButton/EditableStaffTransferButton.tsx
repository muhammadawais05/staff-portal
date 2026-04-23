import React from 'react'
import { Button, Container, Transfer16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Client, RoleV2Scope } from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { useGetCurrentUser } from '@staff-portal/current-user'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { LazyOperation, OperationFragment } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import EditableStaffTransferModal from '../EditableStaffTransferModal'

interface Props {
  mutationDocument: DocumentNode
  mutationName: keyof Client['operations']
  operation?: OperationFragment
  clientId: string
  scope: RoleV2Scope
  staffId?: string
  fieldName: string
}

const EditableStaffTransferButton = ({
  mutationDocument,
  mutationName,
  operation,
  clientId,
  scope,
  staffId,
  fieldName
}: Props) => {
  const user = useGetCurrentUser()
  const { showModal } = useModal(EditableStaffTransferModal, {
    clientId,
    mutationDocument,
    mutationName,
    scope,
    fieldName
  })

  if (!user || user?.id !== staffId) {
    return null
  }

  return (
    <LazyOperation
      initialOperation={operation}
      getLazyOperationVariables={{
        nodeId: clientId,
        nodeType: NodeType.CLIENT,
        operationName: mutationName
      }}
      onSuccess={showModal}
    >
      {({ checkOperation, loading, disabled }) => (
        <Container>
          <Button.Circular
            data-testid='EditableStaffTransferButton-transfer-button'
            disabled={disabled}
            loading={loading}
            onClick={checkOperation}
            variant='flat'
            icon={<Transfer16 />}
          />
        </Container>
      )}
    </LazyOperation>
  )
}

export default EditableStaffTransferButton
