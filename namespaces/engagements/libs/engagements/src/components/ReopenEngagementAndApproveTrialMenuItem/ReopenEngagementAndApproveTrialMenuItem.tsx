import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ReopenEngagementAndApproveTrialModal from '../ReopenEngagementAndApproveTrialModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const ReopenEngagementAndApproveTrialMenuItem = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(ReopenEngagementAndApproveTrialModal, {
    engagementId
  })

  return (
    <Operation
      operation={operation}
      inline={false}
      render={disabled => (
        <Menu.Item
          data-testid='ReopenEngagementAndApproveTrialMenuItem'
          onClick={showModal}
          disabled={disabled}
        >
          Reopen Engagement and Approve Trial
        </Menu.Item>
      )}
    />
  )
}

export default ReopenEngagementAndApproveTrialMenuItem
