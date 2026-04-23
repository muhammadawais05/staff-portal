import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PurchaseOrderInvoices from '.'
import { useGetPurchaseOrderInvoices } from '../../data'

jest.mock('../../../invoice/components/InvoiceList')
jest.mock('@staff-portal/billing/src/components/TableSkeleton')
jest.mock('../../data', () => ({
  ...(jest.requireActual('../../data') as object),
  useGetPurchaseOrderInvoices: jest.fn()
}))

const mockedQuery = useGetPurchaseOrderInvoices as jest.Mock

const render = (props: ComponentProps<typeof PurchaseOrderInvoices>) =>
  renderComponent(<PurchaseOrderInvoices {...props} />)

describe('PurchaseOrderInvoices', () => {
  describe('when data is loading', () => {
    it('renders a loader', () => {
      mockedQuery.mockReturnValue({
        data: undefined,
        error: null,
        loading: true
      })
      const { getByTestId } = render({
        purchaseOrderId: '123456'
      })

      expect(getByTestId('PurchaseOrderInvoices-title')).toContainHTML(
        'Invoices'
      )
      expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
      expect(getByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
    })
  })

  describe('when purchase order has no invoices', () => {
    it('renders an empty invoice list', () => {
      mockedQuery.mockReturnValue({
        data: {
          id: 'purchaseOrder12345',
          invoices: []
        },
        loading: false
      })
      const { getByTestId } = render({
        purchaseOrderId: '123456'
      })
      const emptyListMessage = getByTestId('PurchaseOrderInvoices-empty')

      expect(getByTestId('PurchaseOrderInvoices-title')).toContainHTML(
        'Invoices'
      )
      expect(emptyListMessage).toBeInTheDocument()
      expect(emptyListMessage).toHaveTextContent(
        'No invoices have been assigned to this purchase order yet'
      )
    })
  })

  describe('when purchase order has invoices', () => {
    it('renders a non-empty invoice list', () => {
      mockedQuery.mockReturnValue({
        data: {
          id: 'purchaseOrder12345',
          invoices: {
            nodes: [fixtures.MockInvoice],
            totalCount: 50
          }
        },
        loading: false
      })
      const { getByTestId } = render({
        purchaseOrderId: '123456'
      })

      expect(getByTestId('PurchaseOrderInvoices-title')).toContainHTML(
        'Invoices'
      )
      expect(getByTestId('InvoiceList')).toBeInTheDocument()
      expect(getByTestId('InvoiceList-invoices')).toHaveTextContent('1')
      expect(getByTestId('InvoiceList-statusColumnEnabled')).toHaveTextContent(
        'true'
      )
    })
  })
})
