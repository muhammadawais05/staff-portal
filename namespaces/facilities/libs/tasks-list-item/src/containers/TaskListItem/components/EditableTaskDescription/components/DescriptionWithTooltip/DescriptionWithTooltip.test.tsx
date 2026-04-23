import React, { ReactNode, ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { TaskStatus } from '@staff-portal/tasks'
import { TestWrapper } from '@staff-portal/test-utils'
import { AsyncTooltipWrapper } from '@staff-portal/ui'

import { getDisputeReasonDataHook } from '../../data'
import DescriptionWithTooltip from './DescriptionWithTooltip'

jest.mock('@staff-portal/ui/src/components/AsyncTooltipWrapper', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../../data', () => ({
  getDisputeReasonDataHook: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Typography: jest.fn(),
  TypographyOverflow: jest.fn()
}))

const AsyncTooltipWrapperMock = AsyncTooltipWrapper as jest.Mock
const getDisputeReasonDataHookMock = getDisputeReasonDataHook as jest.Mock
const TypographyOverflowMock = TypographyOverflow as unknown as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock
const dataHookMock = jest.fn()

const arrangeTest = ({
  disputed = false
}: Partial<ComponentProps<typeof DescriptionWithTooltip>> = {}) =>
  render(
    <TestWrapper>
      <DescriptionWithTooltip
        taskId='VjEtVGFzay0xNzgzNTEz'
        description='Mock Description'
        lineThrough={false}
        disputed={disputed}
        status={TaskStatus.CANCELLED}
      />
    </TestWrapper>
  )

describe('DescriptionWithTooltip', () => {
  beforeEach(() => {
    AsyncTooltipWrapperMock.mockClear()
    getDisputeReasonDataHookMock.mockClear()
    TypographyOverflowMock.mockClear()
    TypographyMock.mockClear()
    AsyncTooltipWrapperMock.mockImplementation(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='AsyncTooltipWrapper'>{children}</div>
      )
    )
    TypographyOverflowMock.mockImplementation(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='TypographyOverflow'>{children}</div>
      )
    )
    TypographyMock.mockImplementation(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='TypographyMock'>{children}</div>
      )
    )
    getDisputeReasonDataHookMock.mockImplementation(() => dataHookMock)
  })

  it('should call getDisputeReasonDataHook with proper params', () => {
    arrangeTest()

    expect(getDisputeReasonDataHookMock).toHaveBeenCalledWith({
      feeds: [['gid://platform/Task/1783513']],
      limit: 1,
      actions: ['disputed']
    })
  })

  it('AsyncTooltipWrapper should be rendered with correct props', () => {
    arrangeTest()

    expect(AsyncTooltipWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tooltipContent: expect.any(Function),
        useFetchData: dataHookMock,
        enableTooltip: false
      }),
      {}
    )
  })

  it('TypographyOverflow should be rendered with correct props', () => {
    arrangeTest()

    expect(TypographyOverflowMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tooltipDelay: 'long',
        lineThrough: false,
        children: 'Mock Description'
      }),
      {}
    )
  })

  it('Typography should be rendered with correct props', () => {
    arrangeTest({
      disputed: true
    })

    expect(TypographyMock).toHaveBeenCalledWith(
      expect.objectContaining({
        noWrap: true,
        lineThrough: false,
        children: 'Mock Description'
      }),
      {}
    )
  })
})
