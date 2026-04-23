import React, { ComponentProps, memo } from 'react'
import {
  ModalActionItem,
  areModalActionItemPropsEqual
} from '@staff-portal/modals-service'

import { ActionsDropdownItemProps } from '../../types'
import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'

type Props = ActionsDropdownItemProps &
  Omit<ComponentProps<typeof ModalActionItem>, 'componentType'>

const ActionsDropdownModalItem = memo(
  ({
    operation,
    modal,
    modalProps,
    children,
    dataTestId,
    ...wrapperProps
  }: Props) => (
    <ActionsDropdownTooltipWrapper {...wrapperProps}>
      <ModalActionItem
        componentType='menu-item'
        modal={modal}
        modalProps={modalProps}
        operation={operation}
        data-testid={
          dataTestId ||
          `actions-dropdown-modal-item-${children.replace(/\s/g, '')}`
        }
      >
        {children}
      </ModalActionItem>
    </ActionsDropdownTooltipWrapper>
  ),
  areModalActionItemPropsEqual
)

export default ActionsDropdownModalItem
