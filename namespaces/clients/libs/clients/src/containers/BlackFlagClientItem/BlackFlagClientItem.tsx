import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation } from '@staff-portal/operations'
import { ActionMenuItemProps } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'

import BlackFlagModal from '../BlackFlagModal'

type Props = Omit<ActionMenuItemProps, 'componentType'> & {
  clientId: string
  companyName: string
  operation?: OperationType
}

const BlackFlagClientItem = ({
  clientId,
  companyName,
  operation,
  ...props
}: Props) => {
  const { showModal } = useModal(BlackFlagModal, {
    clientId,
    companyName
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          disabled={disabled}
          data-testid='black-flag-client-item'
          onClick={showModal}
          {...props}
        >
          Black Flag
        </Menu.Item>
      )}
    />
  )
}

export default BlackFlagClientItem
