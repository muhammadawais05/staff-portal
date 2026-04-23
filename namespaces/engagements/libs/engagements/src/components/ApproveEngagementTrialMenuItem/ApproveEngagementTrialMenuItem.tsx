import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Maybe, Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { ApproveEngagementTrialModal } from '../ApproveEngagementTrialModal'

type Props = {
  engagementId: string
  clientId?: Maybe<string>
  talentType?: string
  operation: OperationType
}

const ApproveEngagementTrialMenuItem = ({
  engagementId,
  clientId,
  talentType,
  operation
}: Props) => {
  const { showModal } = useModal(ApproveEngagementTrialModal, {
    engagementId,
    clientId,
    talentType
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='approve-trial'
          onClick={showModal}
          disabled={disabled}
        >
          Approve Trial
        </Menu.Item>
      )}
    />
  )
}

export default ApproveEngagementTrialMenuItem
