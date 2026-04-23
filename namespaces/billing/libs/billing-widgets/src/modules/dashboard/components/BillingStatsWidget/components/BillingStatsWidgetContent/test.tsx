import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingStatsWidgetContent from '.'
import { GetBillingStatsWidgetQuery } from '../../data/getBillingStatsWidget.graphql.types'

jest.mock('../../../../../commercialDocument/components/ListTotals')
jest.mock('../../../../../payment/components/PaymentMethodTotals')

const render = (data?: GetBillingStatsWidgetQuery) =>
  renderComponent(<BillingStatsWidgetContent data={data} />)

describe('BillingStatsWidgetContent', () => {
  describe('when data is missing', () => {
    it('not renders Components', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('ListTotals')).not.toBeInTheDocument()
      expect(queryByTestId('PaymentMethodTotals')).not.toBeInTheDocument()
    })
  })

  describe('when data defined', () => {
    it('renders Components', () => {
      const { getAllByTestId, getByTestId } = render({
        widgets: {
          billingStats: {
            invoicesTotals: [{ amount: '11', category: 'Abc' }],
            paymentsTotals: [{ amount: '11', category: 'Cda' }],
            billingMethods: [{ count: '11', billingMethod: 'ACH' }]
          }
        }
      })

      expect(getAllByTestId('ListTotals')).toHaveLength(2)

      expect(getAllByTestId('ListTotals-totals')[0]).toContainHTML(
        '{"abc":"11"}'
      )
      expect(getAllByTestId('ListTotals-sortOrder')[0]).toContainHTML(
        '["draft","outstanding","overdue","disputed","inCollections","writtenOff","pendingReceipt","credited","paid"]'
      )

      expect(getAllByTestId('ListTotals-totals')[1]).toContainHTML(
        '{"cda":"11"}'
      )
      expect(getAllByTestId('ListTotals-sortOrder')[1]).toContainHTML(
        '["outstanding","due","overdue","onHold","disputed","debited","paid"]'
      )

      expect(getByTestId('PaymentMethodTotals')).toContainHTML(
        '[{"count":"11","billingMethod":"ACH"}]'
      )
    })
  })
})
