import React from 'react'
import { Menu } from '@toptal/picasso'
import {
  GetLazyOperationVariables,
  OperationFragment,
  // Component will be removed once all lazy operations are removed
  // eslint-disable-next-line no-restricted-imports
  useRenderLazyOperation as renderLazyOperation
} from '@staff-portal/operations'

import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'
import { useActionsDropdownContext } from '../../services/use-actions-dropdown-context.ts/use-actions-dropdown-context'
import { ActionsDropdownItemProps } from '../../types'

type Props = ActionsDropdownItemProps & {
  operation: OperationFragment
  operationVariables: GetLazyOperationVariables
  key?: string
  onSuccess?: () => void
}

const ActionsDropdownLazyMenuItem = ({
  operation,
  operationVariables,
  children,
  dataTestId,
  onSuccess,
  ...wrapperProps
}: Props) => {
  const { onSettled, onStart } = useActionsDropdownContext()

  const handleLazyOperationClick = (checkOperation: () => void) => {
    onStart?.()
    checkOperation()
  }

  const render = renderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: operationVariables,
    onSettled,
    onSuccess,
    inline: false
  })

  return render(({ disabled: disabledOperation, checkOperation }) => (
    <ActionsDropdownTooltipWrapper {...wrapperProps}>
      <Menu.Item
        disabled={disabledOperation}
        onClick={() => handleLazyOperationClick(checkOperation)}
        data-testid={
          dataTestId ||
          `actions-dropdown-lazy-operation-${operationVariables.operationName}`
        }
      >
        {children}
      </Menu.Item>
    </ActionsDropdownTooltipWrapper>
  ))
}

export default ActionsDropdownLazyMenuItem
