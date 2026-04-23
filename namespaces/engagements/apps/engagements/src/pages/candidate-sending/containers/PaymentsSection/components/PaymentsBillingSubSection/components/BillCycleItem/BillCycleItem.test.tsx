import React, { ComponentProps, ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import BillCycleItem from './BillCycleItem'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: ({ disabled }: { disabled?: boolean }) => (
      <input data-testid='bill-cycle-item-select' disabled={disabled} />
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
    getBillCycleOptions: () => []
  })
)

const renderComponent = (props?: ComponentProps<typeof BillCycleItem>) =>
  render(
    <TestWrapper>
      <BillCycleItem {...props} />
    </TestWrapper>
  )

describe('BillCycleItem', () => {
  describe('when `hasInitialValue` is `false`', () => {
    it('does not enable tooltip & does not disable select', () => {
      renderComponent({ hasInitialValue: false })

      expect(
        screen.getByTestId('wrap-with-tooltip-enable-tooltip').textContent
      ).toBe('false')
      expect(screen.getByTestId('bill-cycle-item-select')).not.toBeDisabled()
    })
  })

  describe('when `hasInitialValue` is `true`', () => {
    it('enables tooltip & disables select', () => {
      renderComponent({ hasInitialValue: true })

      expect(
        screen.getByTestId('wrap-with-tooltip-enable-tooltip').textContent
      ).toBe('true')
      expect(screen.getByTestId('bill-cycle-item-select')).toBeDisabled()
    })
  })
})
