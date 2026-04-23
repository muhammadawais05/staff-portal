import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import {
  ClientOperations,
  OfacStatus,
  TalentOperations,
  RoleOperations
} from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import ChangeOFACStatusModal from '../ChangeOFACStatusModal'
import { AssociatedRole } from '../../../../types'

export interface Props {
  fullName: string
  nodeId: string
  roleOrClientStatus: Maybe<string>
  ofacStatus?: Maybe<OfacStatus>
  operations:
    | Partial<ClientOperations>
    | Partial<TalentOperations>
    | Partial<RoleOperations>
  associatedRoles: Maybe<AssociatedRole[]>
}

const ChangeOFACStatusButton = ({
  fullName,
  nodeId,
  roleOrClientStatus,
  ofacStatus,
  operations,
  associatedRoles
}: Props) => {
  const { showModal } = useModal(ChangeOFACStatusModal, {
    nodeId,
    fullName,
    roleOrClientStatus,
    associatedRoles,
    currentStatus: ofacStatus ?? OfacStatus.NORMAL
  })

  const operation =
    (operations as Partial<TalentOperations> | Partial<RoleOperations>)
      .updateRoleOfacStatus ||
    (operations as Partial<ClientOperations>).updateClientOfacStatus

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          onClick={showModal}
          disabled={disabled}
          data-testid='change-ofac-status-button'
        >
          Change OFAC Status
        </Button>
      )}
    />
  )
}

export default ChangeOFACStatusButton
