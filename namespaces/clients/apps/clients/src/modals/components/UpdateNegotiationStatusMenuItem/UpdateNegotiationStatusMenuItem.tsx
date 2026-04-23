import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  NegotiationStatus,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import UpdateNegotiationStatusModal from '../UpdateNegotiationStatusModal'

type Props = {
  companyName: string
  negotiationId: string
  negotiationStatus: NegotiationStatus
  operation?: OperationType
}

const UpdateNegotiationStatusMenuItem = ({
  companyName,
  negotiationStatus,
  negotiationId,
  operation
}: Props) => {
  const { showModal } = useModal(UpdateNegotiationStatusModal, {
    companyName,
    negotiationId,
    negotiationStatus
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='update-negotiation-status'
          onClick={showModal}
          disabled={disabled}
        >
          Update Negotiations Status
        </Menu.Item>
      )}
    />
  )
}

export default UpdateNegotiationStatusMenuItem
