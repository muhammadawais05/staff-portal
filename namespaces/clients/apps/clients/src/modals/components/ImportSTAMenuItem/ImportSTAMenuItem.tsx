import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import ImportSTAModal from '../ImportSTAModal'

type Props = {
  companyId: string
  operation: OperationType
}

const ImportSTAMenuItem = ({ companyId, operation }: Props) => {
  const { showModal } = useModal(ImportSTAModal, {
    companyId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='import-sta'
          onClick={showModal}
          disabled={disabled}
        >
          Import STA
        </Menu.Item>
      )}
    />
  )
}

export default ImportSTAMenuItem
