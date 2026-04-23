import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentMethodTotals from '.'

const render = (props: ComponentProps<typeof PaymentMethodTotals>) =>
  renderComponent(<PaymentMethodTotals {...props} />)

describe('PaymentMethodTotals', () => {
  describe('when `billingMethods` is undefined', () => {
    it('not renders Components', () => {
      const { queryByTestId } = render({ billingMethods: undefined })

      expect(queryByTestId('PaymentMethodTotals')).not.toBeInTheDocument()
    })
  })

  describe('when `billingMethods` is defined', () => {
    it('renders Components', () => {
      const { queryByTestId, getByTestId } = render({
        billingMethods: [{ count: 11, billingMethod: 'ACH' }]
      })

      expect(queryByTestId('PaymentMethodTotals')).toBeInTheDocument()
      expect(queryByTestId('OverviewBlock')).toBeInTheDocument()
      expect(queryByTestId('OverviewBlock.Row')).toBeInTheDocument()
      expect(getByTestId('OverviewBlock-label')).toContainHTML('ACH')
      expect(getByTestId('OverviewBlock-value')).toContainHTML('11')
    })
  })
})
