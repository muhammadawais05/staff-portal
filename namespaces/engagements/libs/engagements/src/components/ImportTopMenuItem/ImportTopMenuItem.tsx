import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import { ImportTopModal } from '../ImportTopModal'

type Props = {
  engagementId: string
  operation: OperationType
}

const ImportTopMenuItem = ({ engagementId, operation }: Props) => {
  const { showModal } = useModal(ImportTopModal, { engagementId })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='import-top'
          onClick={showModal}
          disabled={disabled}
        >
          Import TOP
        </Menu.Item>
      )}
    />
  )
}

export default ImportTopMenuItem
