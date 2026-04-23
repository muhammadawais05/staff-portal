import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import SuspendNegotiationModal from '../SuspendNegotiationModal'

type Props = {
  companyName: string
  negotiationId: string
  operation?: OperationType
}

const SuspendNegotiationMenuItem = ({
  companyName,
  negotiationId,
  operation
}: Props) => {
  const { showModal } = useModal(SuspendNegotiationModal, {
    companyName,
    negotiationId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='suspend-negotiation'
          onClick={showModal}
          disabled={disabled}
        >
          Suspend Current Negotiation
        </Menu.Item>
      )}
    />
  )
}

export default SuspendNegotiationMenuItem
