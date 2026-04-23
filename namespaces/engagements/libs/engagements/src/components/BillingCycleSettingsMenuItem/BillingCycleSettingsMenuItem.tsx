import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

type Props = {
  operation: OperationType
  showModal: () => void
}

const BillingCycleSettingsMenuItem = ({ operation, showModal }: Props) => (
  <Operation
    operation={operation}
    render={disabled => (
      <Menu.Item
        onClick={showModal}
        disabled={disabled}
        data-testid='BillingCycleSettingsMenuItem'
      >
        Update Billing Cycle Settings
      </Menu.Item>
    )}
  />
)

export default BillingCycleSettingsMenuItem
