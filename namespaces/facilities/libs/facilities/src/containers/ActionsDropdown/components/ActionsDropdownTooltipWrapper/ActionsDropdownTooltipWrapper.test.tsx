import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'
import { TestWrapper } from '@staff-portal/test-utils'

import ActionsDropdownTooltipWrapper from './ActionsDropdownTooltipWrapper'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  WrapWithTooltip: jest.fn()
}))

const WrapWithTooltipMock = WrapWithTooltip as jest.Mock

const renderComponent = ({
  disabled,
  disabledText
}: {
  disabled?: boolean
  disabledText?: string
}) => {
  return render(
    <TestWrapper>
      <ActionsDropdownTooltipWrapper
        disabled={disabled}
        disabledText={disabledText}
      >
        <span data-testid='children' />
      </ActionsDropdownTooltipWrapper>
    </TestWrapper>
  )
}

describe('ActionsDropdownTooltipWrapper', () => {
  beforeEach(() => {
    WrapWithTooltipMock.mockImplementation(({ children }) => <>{children}</>)
  })

  describe('when `disabled` is false', () => {
    it('renders children without tooltip wrapper', () => {
      renderComponent({ disabled: false })

      expect(WrapWithTooltipMock).toHaveBeenCalledTimes(0)
      expect(screen.getByTestId('children')).toBeInTheDocument()
    })
  })

  describe('when `disabled` is true', () => {
    it('calls children wrapped with tooltip', () => {
      renderComponent({ disabled: true, disabledText: 'Disabled Tooltip' })

      expect(WrapWithTooltipMock).toHaveBeenCalledTimes(1)
      expect(WrapWithTooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: <span data-testid='children' />,
          enableTooltip: true,
          inline: false,
          interactive: false,
          placement: 'top',
          content: 'Disabled Tooltip'
        }),
        {}
      )
      expect(screen.getByTestId('children')).toBeInTheDocument()
    })
  })
})
