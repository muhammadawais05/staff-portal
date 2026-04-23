import { render } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ModalActionItem } from '@staff-portal/modals-service'
import { WrapWithTooltip } from '@staff-portal/ui'

import AcceptCandidateItem from './AcceptCandidateItem'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalActionItem: jest.fn()
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  WrapWithTooltip: jest.fn()
}))

const ModalActionItemMock = ModalActionItem as unknown as jest.Mock
const WrapWithTooltipMock = WrapWithTooltip as jest.Mock

const OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = ({
  operation = OPERATION,
  disabled = false,
  clientHasStaSigned = true,
  engagementId = '123'
}: Partial<ComponentProps<typeof AcceptCandidateItem>> = {}) => {
  ModalActionItemMock.mockImplementation(({ children }) => children)
  WrapWithTooltipMock.mockImplementation(({ children }) => children)

  return render(
    <TestWrapper>
      <AcceptCandidateItem
        componentType='button'
        operation={operation}
        disabled={disabled}
        clientHasStaSigned={clientHasStaSigned}
        engagementId={engagementId}
      />
    </TestWrapper>
  )
}

describe('AcceptCandidateItem', () => {
  it('shows the `ModalActionItem` without tooltip', () => {
    arrangeTest()

    expect(WrapWithTooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enableTooltip: false
      }),
      {}
    )
    expect(ModalActionItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }),
      {}
    )
  })

  it('shows the `ModalActionItem` with tooltip', async () => {
    arrangeTest({ clientHasStaSigned: false })

    expect(WrapWithTooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enableTooltip: true,
        content: 'STA Must be signed'
      }),
      {}
    )
    expect(ModalActionItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }),
      {}
    )
  })

  it('shows the item and hides the tooltip if operation is disabled', () => {
    arrangeTest({
      operation: { callable: OperationCallableTypes.DISABLED, messages: [] }
    })

    expect(WrapWithTooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enableTooltip: false
      }),
      {}
    )
    expect(ModalActionItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      }),
      {}
    )
  })

  it('hides the item if operation is hidden', () => {
    arrangeTest({
      operation: { callable: OperationCallableTypes.HIDDEN, messages: [] }
    })

    expect(WrapWithTooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enableTooltip: false
      }),
      {}
    )
    expect(ModalActionItem).toHaveBeenCalledWith(
      expect.objectContaining({
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      }),
      {}
    )
  })
})
