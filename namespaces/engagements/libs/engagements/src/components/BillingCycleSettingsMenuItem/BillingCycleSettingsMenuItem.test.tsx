import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import BillingCycleSettingsMenuItem from './BillingCycleSettingsMenuItem'

const INITIAL_OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = (operation = INITIAL_OPERATION) =>
  render(
    <TestWrapper>
      <BillingCycleSettingsMenuItem
        operation={operation}
        showModal={() => {}}
      />
    </TestWrapper>
  )

describe('BillingCycleSettingsMenuItem', () => {
  describe('when operation is disabled', () => {
    describe('when hover over the menu item', () => {
      it('shows the tooltip', async () => {
        const TOOLTIP_MESSAGE = 'Tooltip message'

        arrangeTest({
          callable: OperationCallableTypes.DISABLED,
          messages: [TOOLTIP_MESSAGE]
        })

        fireEvent.mouseOver(screen.getByTestId('BillingCycleSettingsMenuItem'))

        expect(await screen.findAllByText(TOOLTIP_MESSAGE)).toHaveLength(2)
      })
    })
  })

  describe('when the operation is hidden', () => {
    it('hides the menu item', () => {
      arrangeTest({
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      })

      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('shows the menu item', () => {
      arrangeTest()

      expect(
        screen.getByTestId('BillingCycleSettingsMenuItem')
      ).toBeInTheDocument()
    })
  })
})
