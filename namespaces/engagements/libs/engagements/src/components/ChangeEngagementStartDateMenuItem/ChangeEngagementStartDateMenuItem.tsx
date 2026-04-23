import { useModal } from '@staff-portal/modals-service'
import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ChangeEngagementStartDateModal from '../ChangeEngagementStartDateModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const ChangeEngagementStartDateMenuItem = ({
  engagementId,
  operation
}: Props) => {
  const { showModal } = useModal(ChangeEngagementStartDateModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          onClick={showModal}
          disabled={disabled}
          data-testid='ChangeEngagementStartDateMenuItem'
        >
          Change Start Date
        </Menu.Item>
      )}
    />
  )
}

export default ChangeEngagementStartDateMenuItem
