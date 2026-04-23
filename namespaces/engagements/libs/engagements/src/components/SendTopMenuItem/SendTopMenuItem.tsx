import React from 'react'
import { Menu } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { isOperationEnabled, Operation } from '@staff-portal/operations'

import { SendTopModal } from '../SendTopModal'

type Props = {
  engagementId: string
  operation: OperationType
  clientHasStaSigned: boolean
}

const SendTopMenuItem = ({
  engagementId,
  operation,
  clientHasStaSigned
}: Props) => {
  const { showModal } = useModal(SendTopModal, { engagementId })

  const clientDoesNotHaveStaSigned =
    isOperationEnabled(operation) && !clientHasStaSigned

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          data-testid='send-top'
          onClick={showModal}
          disabled={disabled || clientDoesNotHaveStaSigned}
        >
          Send TOP
        </Menu.Item>
      )}
    />
  )
}

export default SendTopMenuItem
