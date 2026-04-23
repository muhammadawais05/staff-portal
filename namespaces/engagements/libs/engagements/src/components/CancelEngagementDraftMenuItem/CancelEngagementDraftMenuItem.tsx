import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import CancelEngagementDraftModal from '../CancelEngagementDraftModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const CancelEngagementDraftMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(CancelEngagementDraftModal, { engagementId })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='cancel-engagement-draft'
          onClick={showModal}
          disabled={disabled}
        >
          Cancel Draft
        </Menu.Item>
      )}
    />
  )
}

export default CancelEngagementDraftMenuItem
