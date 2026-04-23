import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListTable from '.'

const { totals: invoiceTableTotals } = fixtures.MockInvoiceList.invoices

jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
)
jest.mock('../InvoiceListTableRow')
jest.mock('@staff-portal/billing/src/components/MonthlyTotals')
jest.mock('../InvoiceListTableHeader')

const render = (props: ComponentProps<typeof InvoiceListTable>) =>
  renderComponent(<InvoiceListTable {...props} />)

describe('InvoiceListTable', () => {
  it('default render', () => {
    const { queryByTestId, queryAllByTestId } = render({
      invoices: {
        loading: false,
        initialLoading: false,
        data: fixtures.MockInvoiceList.invoices
      },
      totals: {
        data: {
          groups: [{ totals: invoiceTableTotals, year: 2020, month: 10 }]
        },
        loading: false,
        initialLoading: false
      }
    })

    expect(queryByTestId('InvoiceListTableHeader')).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isActionsVisible')
    ).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isRecipientVisible')
    ).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isStatusVisible')
    ).toBeInTheDocument()

    expect(queryByTestId('MonthlyTotals')).toBeInTheDocument()

    expect(queryAllByTestId('Row')).toHaveLength(3)
  })

  it('handles invoices loading state', () => {
    const { queryByTestId } = render({
      invoices: {
        loading: true,
        initialLoading: true,
        data: undefined
      },
      totals: {
        data: undefined,
        loading: false,
        initialLoading: false
      }
    })

    expect(queryByTestId('InvoiceListTableHeader')).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isActionsVisible')
    ).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isRecipientVisible')
    ).toBeInTheDocument()
    expect(
      queryByTestId('InvoiceListTableHeader-isStatusVisible')
    ).toBeInTheDocument()

    expect(queryByTestId('MonthlyTotals')).toBeNull()
    expect(queryByTestId('Row')).toBeNull()
  })

  it('handles totals loading state', () => {
    const { queryByTestId } = render({
      invoices: {
        loading: false,
        initialLoading: false,
        data: fixtures.MockInvoiceList.invoices
      },
      totals: {
        data: undefined,
        loading: true,
        initialLoading: false
      }
    })

    expect(queryByTestId('LoaderOverlay')).toBeInTheDocument()
  })

  it('no results render', () => {
    const { queryByTestId } = render({
      invoices: {
        loading: false,
        initialLoading: false,
        data: { groups: [] }
      },
      totals: {
        data: undefined,
        loading: false,
        initialLoading: false
      }
    })

    expect(queryByTestId('ListTable-emptyMessage')).toBeInTheDocument()
  })
})
