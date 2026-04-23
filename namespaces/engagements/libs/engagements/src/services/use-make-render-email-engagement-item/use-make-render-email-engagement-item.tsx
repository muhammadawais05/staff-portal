import React from 'react'
import { Menu } from '@toptal/picasso'

import { useMakeRenderEmailEngagementLazyOperation } from '../../data'

type Props = {
  renderLazyOperation: ReturnType<
    typeof useMakeRenderEmailEngagementLazyOperation
  >
  label: string
  showModal: () => void
  handleOperationClick: (checkOperation: () => void) => () => void
  'data-testid'?: string
}

export const RenderEmailEngagementItem =
  ({
    renderLazyOperation,
    label,
    showModal,
    handleOperationClick,
    'data-testid': dataTestId
  }: Props) =>
  ({ hidden }: { hidden?: boolean } = {}) =>
    renderLazyOperation(
      showModal,
      hidden
    )(({ checkOperation, disabled }) => (
      <Menu.Item
        data-testid={dataTestId}
        disabled={disabled}
        onClick={handleOperationClick(checkOperation)}
      >
        {label}
      </Menu.Item>
    ))
