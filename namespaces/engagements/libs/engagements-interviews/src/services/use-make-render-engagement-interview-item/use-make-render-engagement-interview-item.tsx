import React from 'react'
import { Menu } from '@toptal/picasso'

import { useMakeRenderEngagementInterviewLazyOperation } from '../../data/use-make-render-engagement-interview-lazy-operation'
import { EngagementInterviewOperationsFragment } from '../../data/get-engagement'

type Props = {
  operationName: keyof EngagementInterviewOperationsFragment['operations']
  renderLazyOperation: ReturnType<
    typeof useMakeRenderEngagementInterviewLazyOperation
  >
  label: string
  showModal: () => void
  handleOperationClick: (checkOperation: () => void) => () => void
  'data-testid'?: string
}

export const RenderEngagementInterviewItem =
  ({
    operationName,
    renderLazyOperation,
    label,
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
        data-testid={dataTestId}
        disabled={disabled}
        onClick={handleOperationClick(checkOperation)}
      >
        {label}
      </Menu.Item>
    ))
