import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import StartNegotiationModal from '../StartNegotiationModal'

type Props = {
  companyId: string
  companyName: string
  operation: OperationType
}

const StartNegotiationMenuItem = ({
  companyId,
  companyName,
  operation
}: Props) => {
  const { showModal } = useModal(StartNegotiationModal, {
    companyId,
    companyName
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='start-negotiation'
          onClick={showModal}
          disabled={disabled}
        >
          Start Negotiations
        </Menu.Item>
      )}
    />
  )
}

export default StartNegotiationMenuItem
