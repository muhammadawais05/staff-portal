import React, { ReactElement } from 'react'
import { Menu } from '@toptal/picasso'
import { MenuLink } from '@staff-portal/ui'
import { LazyOperationRenderProps, Operation } from '@staff-portal/operations'

import { ActionItem, DropdownActionType } from '../../utils'
import { getActionsDropdownItemKey } from './utils'

type OperationName = string

interface Props {
  item: ActionItem
  onLazyOperationClick: (checkOperation: () => void) => void
  renderLazyOperationsMap: Record<
    OperationName,
    (
      children: (renderProps: LazyOperationRenderProps) => ReactElement
    ) => ReactElement
  >
}

const ActionsDropdownItem = ({
  item,
  onLazyOperationClick,
  renderLazyOperationsMap
}: Props) => {
  const { label, visible, disabled } = item

  if (visible === false || visible === null) {
    return null
  }

  const key = getActionsDropdownItemKey(item)

  if (item.type === DropdownActionType.STATIC) {
    return (
      <Menu.Item
        onClick={() => item.action?.()}
        data-testid={`actions-dropdown-item-${key}`}
      >
        {label}
      </Menu.Item>
    )
  }

  if (item.type === DropdownActionType.LINK) {
    const { url, disabledText } = item

    return url || disabledText ? (
      <Menu.Item
        as={MenuLink}
        disabled={disabled}
        {...(item.newWindow
          ? { rel: 'noopener noreferrer', target: '_blank' }
          : {})}
        href={url as string}
        data-testid={`actions-dropdown-link-${key}`}
      >
        {label}
      </Menu.Item>
    ) : null
  }

  if (item.type === DropdownActionType.OPERATION) {
    const { operation } = item

    return (
      <Operation
        inline={false}
        operation={operation}
        render={operationDisabled => (
          <Menu.Item
            disabled={operationDisabled}
            onClick={() => item.action?.()}
            data-testid={`actions-dropdown-operation-${key}`}
          >
            {label}
          </Menu.Item>
        )}
      />
    )
  }

  if (item.type === DropdownActionType.LAZY_OPERATION) {
    const {
      operationVariables: { operationName }
    } = item

    const render = renderLazyOperationsMap[operationName]

    return render(({ disabled: disabledOperation, checkOperation }) => (
      <Menu.Item
        disabled={disabledOperation}
        onClick={() => onLazyOperationClick(checkOperation)}
        data-testid={`actions-dropdown-lazy-operation-${key}`}
      >
        {label}
      </Menu.Item>
    ))
  }

  return null
}

export default ActionsDropdownItem
