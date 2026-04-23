import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Menu } from '@toptal/picasso'
import React from 'react'
import { Operation } from '@staff-portal/operations'
import { ActionMenuItemProps } from '@staff-portal/ui'

import usePauseClientModal from '../PauseClientModal/use-pause-client-modal'

type Props = Omit<ActionMenuItemProps, 'componentType'> & {
  clientId: string
  operation?: OperationType
}

const PauseClientItem = ({ clientId, operation, ...props }: Props) => {
  const { showModal } = usePauseClientModal({
    clientId
  })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          disabled={disabled}
          data-testid='pause-client-item'
          onClick={showModal}
          {...props}
        >
          Pause Company
        </Menu.Item>
      )}
    />
  )
}

export default PauseClientItem
