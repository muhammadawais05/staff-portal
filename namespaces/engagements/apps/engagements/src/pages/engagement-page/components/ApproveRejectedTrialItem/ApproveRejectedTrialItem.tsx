import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ApproveRejectedTrialModal from '../ApproveRejectedTrialModal'

type Props = {
  engagementId: string
  talentType?: string
  operation: OperationType
}

const ApproveRejectedTrialItem = ({
  engagementId,
  talentType,
  operation
}: Props) => {
  const { showModal } = useModal(ApproveRejectedTrialModal, {
    engagementId,
    talentType
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='approve-rejected-trial'
          onClick={showModal}
          disabled={disabled}
        >
          Approve Trial
        </Menu.Item>
      )}
    />
  )
}

export default ApproveRejectedTrialItem
