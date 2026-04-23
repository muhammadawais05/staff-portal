import React from 'react'
import { Menu } from '@toptal/picasso'

import {
  EngagementOperationsFragment,
  useMakeRenderEngagementLazyOperation
} from '../../data'

type Props = {
  operationName: keyof EngagementOperationsFragment
  renderLazyOperation: ReturnType<typeof useMakeRenderEngagementLazyOperation>
  label: string
  titleCase?: boolean
  showModal: () => void
  handleOperationClick: (checkOperation: () => void) => () => void
  'data-testid'?: string
}

export const RenderEngagementItem =
  ({
    operationName,
    renderLazyOperation,
    label,
    titleCase,
    showModal,
    handleOperationClick,
    'data-testid': dataTestId
  }: Props) =>
  ({ hidden }: { hidden?: boolean } = {}) =>
    renderLazyOperation(
      operationName,
      showModal,
      hidden
    )(({ checkOperation, disabled }) => (
      <Menu.Item
        titleCase={titleCase}
        data-testid={dataTestId}
        disabled={disabled}
        onClick={handleOperationClick(checkOperation)}
      >
        {label}
      </Menu.Item>
    ))
