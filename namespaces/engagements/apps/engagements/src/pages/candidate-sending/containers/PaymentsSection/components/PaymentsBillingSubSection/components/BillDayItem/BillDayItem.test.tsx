import React, { ComponentProps, ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import BillDayItem from './BillDayItem'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: ({ disabled }: { disabled?: boolean }) => (
      <input data-testid='bill-day-item-select' disabled={disabled} />
    )
  }
}))

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  WrapWithTooltip: ({
    children,
    enableTooltip = false
  }: {
    children: ReactNode
    enableTooltip?: boolean
  }) => (
    <>
      <div data-testid='wrap-with-tooltip-enable-tooltip'>
        {enableTooltip.toString()}
      </div>
      <>{children}</>
    </>
  )
}))

jest.mock(
  '../../../../../../utils',
  () => ({
    getBillDayOptions: () => []
  })
)

const renderComponent = (props?: ComponentProps<typeof BillDayItem>) =>
  render(
    <TestWrapper>
      <BillDayItem {...props} />
    </TestWrapper>
  )

describe('BillDayItem', () => {
  describe('when `hasInitialValue` is `false`', () => {
    it('does not enable tooltip & does not disable select', () => {
      renderComponent({ hasInitialValue: false })

      expect(
        screen.getByTestId('wrap-with-tooltip-enable-tooltip').textContent
      ).toBe('false')
      expect(screen.getByTestId('bill-day-item-select')).not.toBeDisabled()
    })
  })

  describe('when `hasInitialValue` is `true`', () => {
    it('enables tooltip & disables select', () => {
      renderComponent({ hasInitialValue: true })

      expect(
        screen.getByTestId('wrap-with-tooltip-enable-tooltip').textContent
      ).toBe('true')
      expect(screen.getByTestId('bill-day-item-select')).toBeDisabled()
    })
  })

  describe('when `isMonthlyCycle` is `true`', () => {
    it('does not render component', () => {
      renderComponent({ isMonthlyCycle: true })

      expect(
        screen.queryByTestId('wrap-with-tooltip-enable-tooltip')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('bill-day-item-select')
      ).not.toBeInTheDocument()
    })
  })
})
