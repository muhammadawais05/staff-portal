import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceDetailsTableWrapper from '.'
import { useGetInvoiceDetailsTable } from '../../data/useGetInvoiceDetailsTable'

jest.mock('../../data/useGetInvoiceDetailsTable')
jest.mock('@staff-portal/billing/src/data')

jest.mock('../Table', () =>
  jest.fn().mockReturnValue(<div data-testid='InvoiceDetailsTable'>Test</div>)
)
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
const render = () =>
  renderComponent(<InvoiceDetailsTableWrapper invoiceId='abc123' />)

describe('InvoiceDetailsTableWrapper', () => {
  describe('when loading `true`', () => {
    it('renders component', () => {
      useGetInvoiceDetailsTable.mockReturnValue(() => ({
        data: null,
        loading: true,
        initialLoading: false,
        refetch: jest.mock()
      }))
      const { container, getByTestId } = render()

      expect(getByTestId('LoaderOverlayWrapper')).toBeInTheDocument()
      expect(getByTestId('InvoiceDetailsTable')).toBeInTheDocument()

      expect(container).toMatchSnapshot()
    })
  })

  describe('when loading `false`', () => {
    it('renders component', () => {
      useGetInvoiceDetailsTable.mockReturnValue(() => ({
        data: { a: 'a' },
        loading: false,
        initialLoading: false,
        refetch: jest.mock()
      }))
      const { container, getByTestId } = render()

      expect(getByTestId('InvoiceDetailsTable')).toBeInTheDocument()

      expect(container).toMatchSnapshot()
    })
  })

  describe('when initialLoading `true`', () => {
    it('renders component', () => {
      useGetInvoiceDetailsTable.mockReturnValue(() => ({
        data: null,
        loading: false,
        initialLoading: true,
        refetch: jest.mock()
      }))
      const { container } = render()

      expect(container).toMatchSnapshot()
    })
  })
})
