import { useModal } from '@staff-portal/modals-service'
import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ChangeEngagementEndDateModal from '../ChangeEngagementEndDateModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const ChangeEngagementEndDateMenuItem = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(ChangeEngagementEndDateModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          onClick={showModal}
          disabled={disabled}
          data-testid='ChangeEngagementEndDateMenuItem'
        >
          Change End Date
        </Menu.Item>
      )}
    />
  )
}

export default ChangeEngagementEndDateMenuItem
