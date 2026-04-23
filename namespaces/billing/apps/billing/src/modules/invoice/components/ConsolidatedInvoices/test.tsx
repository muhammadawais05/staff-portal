import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidatedInvoices from '.'
import { useGetConsolidatedInvoices } from '../../data'

jest.mock('../../data')
jest.mock('../InvoiceList')

const render = (props: ComponentProps<typeof ConsolidatedInvoices>) =>
  renderComponent(<ConsolidatedInvoices {...props} />)

describe('ConsolidatedInvoices', () => {
  describe('when no data returned', () => {
    it('default render', () => {
      useGetConsolidatedInvoices.mockReturnValue({
        data: null,
        loading: false
      })
      const { queryByTestId } = render({
        invoiceId: 'abc123'
      })
      const WrapperComponent = queryByTestId('ConsolidatedInvoices')

      expect(WrapperComponent).toBeNull()
    })
  })

  describe('when data value returned', () => {
    describe('when no item returned', () => {
      it('default render', () => {
        useGetConsolidatedInvoices.mockReturnValue({
          data: { originalInvoices: { nodes: [] } },
          loading: false
        })
        const { queryByTestId } = render({
          invoiceId: 'abc123'
        })
        const WrapperComponent = queryByTestId('ConsolidatedInvoices')

        expect(WrapperComponent).toBeNull()
      })
    })

    describe('when originalInvoices are returned', () => {
      it('default render', () => {
        useGetConsolidatedInvoices.mockReturnValue({
          data: {
            originalInvoices: { nodes: [fixtures.MockInvoice] }
          },
          loading: false
        })
        const { queryByTestId, getByTestId } = render({
          invoiceId: 'abc123'
        })
        const WrapperComponent = queryByTestId('ConsolidatedInvoices')
        const TitleComponent = queryByTestId('ConsolidatedInvoices-title')

        expect(WrapperComponent).not.toBeNull()
        expect(TitleComponent).not.toBeNull()

        expect(getByTestId('ConsolidatedInvoices-title')).toContainHTML(
          'Consolidated Invoices'
        )
        expect(getByTestId('ConsolidatedInvoices-subtitle')).toContainHTML(
          '$2,295.00'
        )
        expect(getByTestId('InvoiceList')).not.toBeNull()
      })
    })
    describe('when formerOriginalInvoices are returned for an unconsolidated invoice', () => {
      it('default render', () => {
        useGetConsolidatedInvoices.mockReturnValue({
          data: {
            unconsolidated: true,
            formerOriginalInvoices: { nodes: [fixtures.MockInvoice] }
          },
          loading: false
        })
        const { queryByTestId, getByTestId } = render({
          invoiceId: 'abc123'
        })
        const WrapperComponent = queryByTestId('ConsolidatedInvoices')
        const TitleComponent = queryByTestId('ConsolidatedInvoices-title')

        expect(WrapperComponent).not.toBeNull()
        expect(TitleComponent).not.toBeNull()

        expect(getByTestId('ConsolidatedInvoices-title')).toContainHTML(
          'Original Invoices'
        )
        expect(getByTestId('ConsolidatedInvoices-subtitle')).toContainHTML(
          '$2,295.00'
        )
        expect(getByTestId('InvoiceList')).not.toBeNull()
      })
    })
  })
})
