import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import OpportunitySalesforceConnectionPopup from '.'

jest.mock('@staff-portal/ui', () => ({
  StatusMessageNotification: () => (
    <div data-testid='StatusMessageNotification' />
  )
}))

const renderComponent = (
  props: ComponentProps<typeof OpportunitySalesforceConnectionPopup>
) =>
  render(
    <TestWrapper>
      <OpportunitySalesforceConnectionPopup {...props} />
    </TestWrapper>
  )

describe('OpportunitySalesforceConnectionPopup', () => {
  describe('when salesforceId is provided', () => {
    it('renders the StatusMessageNotification component', () => {
      renderComponent({
        salesforceId: 'salesforceId'
      })

      expect(
        screen.queryByTestId('StatusMessageNotification')
      ).toBeInTheDocument()
    })
  })

  describe('when salesforceId is not provided', () => {
    it('does not render the StatusMessageNotification component', () => {
      renderComponent({
        salesforceId: null
      })

      expect(
        screen.queryByTestId('StatusMessageNotification')
      ).not.toBeInTheDocument()
    })
  })
})
