import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { ApproveDraftEngagementModal } from '../ApproveDraftEngagementModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const ApproveDraftEngagementMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(ApproveDraftEngagementModal, {
    engagementId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='approve-draft'
          onClick={showModal}
          disabled={disabled}
        >
          Approve Draft
        </Menu.Item>
      )}
    />
  )
}

export default ApproveDraftEngagementMenuItem
