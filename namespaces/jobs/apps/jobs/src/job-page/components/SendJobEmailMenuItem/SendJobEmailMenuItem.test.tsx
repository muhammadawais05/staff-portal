import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SendJobEmailMenuItem from './SendJobEmailMenuItem'

const INITIAL_OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = (operation = INITIAL_OPERATION) => {
  return render(
    <TestWrapper>
      <SendJobEmailMenuItem jobEmailMessagingId='123' operation={operation} />
    </TestWrapper>
  )
}

describe('SendJobEmailMenuItem', () => {
  describe('when operation is disabled', () => {
    describe('when hover over the menu item', () => {
      it('shows the tooltip', async () => {
        const TOOLTIP_MESSAGE = 'Tooltip message'

        arrangeTest({
          callable: OperationCallableTypes.DISABLED,
          messages: [TOOLTIP_MESSAGE]
        })

        fireEvent.mouseOver(screen.getByTestId('send-job-email-menu-item'))

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
        screen.queryByTestId('send-job-email-menu-item')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('shows the menu item', () => {
      arrangeTest()

      expect(screen.getByTestId('send-job-email-menu-item')).toBeInTheDocument()
    })
  })
})
