import React from 'react'
import { WrapWithTooltip, MoreButton } from '@staff-portal/ui'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation as renderLazyOperation } from '@staff-portal/operations'

import { ActionsList, DropdownActionType } from './utils'
import ActionsDropdownItem from './components/ActionsDropdownItem'

const useLazyOperations = ({
  actions,
  onSettled
}: {
  actions: ActionsList
  onSettled?: () => void
}) => {
  const operations: Record<string, ReturnType<typeof renderLazyOperation>> = {}

  for (const item of actions) {
    if (item.type !== DropdownActionType.LAZY_OPERATION) {
      continue
    }
    const { operation, operationVariables, action: onSuccess } = item
    const { operationName } = operationVariables

    operations[operationName] = renderLazyOperation({
      initialOperation: operation,
      getLazyOperationVariables: operationVariables,
      onSettled,
      onSuccess,
      inline: false
    })
  }

  return operations
}

interface Props {
  loading?: boolean
  actions: ActionsList
  onStart?: () => void
  onSettled?: () => void
}

/**
 * @deprecated use `ActionsDropdown` instead
 */
const DeprecatedActionsDropdown = ({
  loading,
  actions,
  onStart,
  onSettled
}: Props) => {
  // required to execute hooks before `MoreButton` component, so they would be cached on react level,
  // otherwise as soon as you're clicking on menu item, component is destroyed, thus all nested hooks too
  const renderLazyOperationsMap = useLazyOperations({ actions, onSettled })
  const handleLazyOperationClick = (checkOperation: () => void) => {
    onStart?.()
    checkOperation()
  }

  return (
    <MoreButton fullHeight disablePopper loading={loading}>
      {actions.map(item => {
        const { key, label, disabled, disabledText } = item
        const enableTooltip = !!(disabled && disabledText)

        return (
          <WrapWithTooltip
            key={key || label}
            enableTooltip={enableTooltip}
            placement='top'
            inline={false}
            interactive={false}
            content={disabledText}
          >
            <ActionsDropdownItem
              item={item}
              renderLazyOperationsMap={renderLazyOperationsMap}
              onLazyOperationClick={handleLazyOperationClick}
            />
          </WrapWithTooltip>
        )
      })}
    </MoreButton>
  )
}

export default DeprecatedActionsDropdown
