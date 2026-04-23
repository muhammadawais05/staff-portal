import React, { ComponentProps } from 'react'
import { OperationActionItem } from '@staff-portal/operations'

import { ActionsDropdownItemProps } from '../../types'
import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'

type Props = ActionsDropdownItemProps &
  Omit<ComponentProps<typeof OperationActionItem>, 'componentType'>

const ActionsDropdownMenuItem = ({
  operation,
  children,
  dataTestId,
  onClick,
  ...wrapperProps
}: Props) => (
  <ActionsDropdownTooltipWrapper {...wrapperProps}>
    <OperationActionItem
      componentType='menu-item'
      onClick={onClick}
      operation={operation}
      data-testid={
        dataTestId ||
        `actions-dropdown-menu-item-${children.replace(/\s/g, '')}`
      }
    >
      {children}
    </OperationActionItem>
  </ActionsDropdownTooltipWrapper>
)

export default ActionsDropdownMenuItem
