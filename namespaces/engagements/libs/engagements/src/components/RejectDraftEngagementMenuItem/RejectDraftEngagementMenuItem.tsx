import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { RejectDraftEngagementModal } from '../RejectDraftEngagementModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const RejectDraftEngagementMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(RejectDraftEngagementModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='reject-draft-engagement'
          onClick={showModal}
          disabled={disabled}
        >
          Reject with Feedback
        </Menu.Item>
      )}
    />
  )
}

export default RejectDraftEngagementMenuItem
