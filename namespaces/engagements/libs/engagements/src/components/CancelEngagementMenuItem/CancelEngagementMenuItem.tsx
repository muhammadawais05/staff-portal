import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import CancelEngagementModal from '../CancelEngagementModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const CancelEngagementMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(CancelEngagementModal, { engagementId })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='cancel-engagement'
          onClick={showModal}
          disabled={disabled}
        >
          Cancel Engagement
        </Menu.Item>
      )}
    />
  )
}

export default CancelEngagementMenuItem
