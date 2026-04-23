import React, { ReactNode, useCallback } from 'react'
import { ActionItemProps } from '@staff-portal/ui'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Button, Menu } from '@toptal/picasso'

import Operation from '../Operation'

export type Props = ActionItemProps & {
  children: ReactNode
  operation: OperationType | null | undefined
  skipOperationCheck?: boolean
  onClick: () => void
}

/**
 * This component is a wrapper over `<Operation>` + `<Button>/<Menu.Item>` components
 */
const OperationActionItem = ({
  children,
  componentType,
  disabled: externalDisabled,
  operation,
  skipOperationCheck,
  onClick,
  'data-testid': dataTestId = 'operation-action-item',
  ...restProps
}: Props) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [onClick])

  const Component = componentType === 'button' ? Button : Menu.Item
  const inline = componentType === 'button'

  if (skipOperationCheck) {
    return (
      <Component data-testid={dataTestId} onClick={handleClick} {...restProps}>
        {children}
      </Component>
    )
  }

  return (
    <Operation
      inline={inline}
      operation={operation}
      render={disabled => {
        return (
          <Component
            disabled={disabled || !!externalDisabled}
            data-testid={dataTestId}
            onClick={handleClick}
            {...restProps}
          >
            {children}
          </Component>
        )
      }}
    />
  )
}

export default OperationActionItem
