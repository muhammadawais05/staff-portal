import { Button, Menu } from '@toptal/picasso'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'

import ExpireEngagementModal from '../ExpireEngagementModal'

type Props = ActionItemProps & {
  engagementId: string
  initialOperation: OperationType
  'data-testid'?: string
}

const ExpireEngagementItem = ({
  engagementId,
  initialOperation,
  componentType,
  'data-testid': dataTestId = 'expire-engagement-item',
  ...props
}: Props) => {
  const { showModal } = useModal(ExpireEngagementModal, { engagementId })

  const Component = componentType === 'menu-item' ? Menu.Item : Button
  const componentProps =
    componentType === 'button'
      ? { ...props, size: 'small', variant: 'negative' }
      : props

  return (
    <Operation
      inline
      operation={initialOperation}
      render={disabled => (
        <Component
          disabled={disabled}
          onClick={showModal}
          data-testid={dataTestId}
          {...componentProps}
        >
          Expire
        </Component>
      )}
    />
  )
}

export default ExpireEngagementItem
