import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import PurchaseOrderLine from '.'

const render = (props: ComponentProps<typeof PurchaseOrderLine>) =>
  renderComponent(<PurchaseOrderLine {...props} />)

describe('Invoice - PurchaseOrderLine', () => {
  describe('when po line has a url', () => {
    it('renders po & po line budget left', () => {
      const { queryByTestId, queryByText, getByTestId } = render({
        invoice: {
          purchaseOrderLine: {
            id: 'line-1',
            budgetLeft: '500.00',
            webResource: { url: 'url', text: '' },
            poLineNumber: 'line-1',
            purchaseOrder: {
              id: '1',
              webResource: { url: 'url', text: '' },
              poNumber: 'po-1'
            }
          },
          purchaseOrder: {
            id: '1',
            webResource: { url: 'url', text: '' },
            poNumber: 'po-1'
          }
        }
      })

      expect(queryByText(EMPTY_DATA)).not.toBeInTheDocument()
      expect(getByTestId('purchase-order-link')).toHaveTextContent('po-1')
      expect(queryByTestId('purchase-order-line-link')).toHaveTextContent(
        'line-1 ($500.00 Left)'
      )
    })
  })

  describe('when po line has no url', () => {
    it('renders empty data', () => {
      const { getByText, queryByTestId } = render({ invoice: {} })

      expect(getByText(EMPTY_DATA)).toBeInTheDocument()

      expect(queryByTestId('po-line-label')).not.toBeInTheDocument()
      expect(queryByTestId('po-label')).not.toBeInTheDocument()
    })
  })
})
