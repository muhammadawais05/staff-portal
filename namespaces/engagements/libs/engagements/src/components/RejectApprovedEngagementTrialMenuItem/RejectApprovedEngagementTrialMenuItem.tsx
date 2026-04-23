import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { RejectApprovedEngagementTrialModal } from '../RejectEngagementTrialModal'

type Props = {
  engagementId: string
  talentType?: string
  operation: OperationType
}

const RejectApprovedEngagementTrialMenuItem = ({
  engagementId,
  talentType,
  operation
}: Props) => {
  const { showModal } = useModal(RejectApprovedEngagementTrialModal, {
    engagementId,
    talentType
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='reject-approved-trial'
          onClick={showModal}
          disabled={disabled}
        >
          Reject Trial
        </Menu.Item>
      )}
    />
  )
}

export default RejectApprovedEngagementTrialMenuItem
