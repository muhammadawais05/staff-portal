import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import CancelInterviewModal from '../CancelInterviewModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const CancelInterviewMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(CancelInterviewModal, { engagementId })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='cancel-interview'
          onClick={showModal}
          disabled={disabled}
        >
          Cancel Interview
        </Menu.Item>
      )}
    />
  )
}

export default CancelInterviewMenuItem
