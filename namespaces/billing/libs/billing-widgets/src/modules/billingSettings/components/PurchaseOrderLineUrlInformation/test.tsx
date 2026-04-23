import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import PurchaseOrderLineUrlInformation from '.'

const render = (
  props: ComponentProps<typeof PurchaseOrderLineUrlInformation>
) => renderComponent(<PurchaseOrderLineUrlInformation {...props} />)

const purchaseOrderLine = {
  id: '123',
  poLineNumber: 'PO-line-123',
  client: {
    fullName: 'client-name'
  },
  webResource: {
    url: 'po-line-url',
    text: 'po-line-text'
  },
  purchaseOrder: {
    id: '123',
    poNumber: 'PO-123',
    webResource: {
      url: 'po-url',
      text: 'po-text'
    }
  }
}

describe('PurchaseOrderLineUrlInformation', () => {
  describe('renders empty data', () => {
    it('when there are no purchase order lines or purchase orders', () => {
      const { getByText } = render({})

      expect(getByText(EMPTY_DATA)).toBeInTheDocument()
    })
  })

  describe('renders both purchase order and purchase order lines', () => {
    it('when purchase order lines exist', () => {
      const { queryByTestId, queryByText, getByTestId } = render({
        purchaseOrderLine
      })

      expect(queryByText(EMPTY_DATA)).not.toBeInTheDocument()
      expect(queryByTestId('po-label')).toBeInTheDocument()
      expect(getByTestId('po-link')).toHaveTextContent('PO-123')
      expect(queryByTestId('po-line-label')).toBeInTheDocument()
      expect(queryByTestId('po-line-link')).toBeInTheDocument()
    })
  })
})
