import React, { ReactNode } from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ReactivateEngagementModal from '../ReactivateEngagementModal'

type Props = {
  engagementId: string
  operation: OperationType
  children: ReactNode
}

const ReactivateEngagementMenuItem = ({
  engagementId,
  operation,
  children
}: Props) => {
  const { showModal } = useModal(ReactivateEngagementModal, {
    engagementId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='reactivate-engagement'
          onClick={showModal}
          disabled={disabled}
        >
          {children}
        </Menu.Item>
      )}
    />
  )
}

export default ReactivateEngagementMenuItem
