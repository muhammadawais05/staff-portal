import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

type Props = {
  operation: OperationType
  showModal: () => void
}

const ChangeEngagementCommitmentMenuItem = ({
  operation,
  showModal
}: Props) => (
  <Operation
    operation={operation}
    render={disabled => (
      <Menu.Item
        onClick={showModal}
        disabled={disabled}
        data-testid='ChangeEngagementCommitmentMenuItem'
      >
        Change Commitment
      </Menu.Item>
    )}
  />
)

export default ChangeEngagementCommitmentMenuItem
