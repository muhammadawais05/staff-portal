import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import RestoreCancelledEngagementModal from '../RestoreCancelledEngagementModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const RestoreCancelledEngagementMenuItem = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(RestoreCancelledEngagementModal, {
    engagementId
  })

  return (
    <Operation
      operation={operation}
      inline={false}
      render={disabled => (
        <Menu.Item
          data-testid='RestoreCancelledEngagement-menu-item'
          onClick={showModal}
          disabled={disabled}
        >
          Restore Cancelled Interview
        </Menu.Item>
      )}
    />
  )
}

export default RestoreCancelledEngagementMenuItem
