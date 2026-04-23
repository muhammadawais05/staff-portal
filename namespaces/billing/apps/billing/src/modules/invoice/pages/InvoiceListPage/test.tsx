import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListPage from '.'
import {
  useGetInvoicesListQuery,
  useGetInvoicesMonthlyTotalsQuery
} from '../../data'

jest.mock('@apollo/client')
jest.mock('../../data')
jest.mock('../../utils/useActionsInvoice', () => ({
  useActionsInvoice: jest
    .fn()
    .mockReturnValue({ handleOnApplyPromotions: jest.fn() })
}))
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTable'
)
jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('../../components/InvoiceListSearch')
jest.mock('../../components/InvoiceListTable')
jest.mock('../../components/InvoiceListHeader')
jest.mock('../../components/InvoiceListTotals')

const render = () => renderComponent(<InvoiceListPage />)

const MockGetInvoicesList = useGetInvoicesListQuery as jest.Mock
const MockGetInvoicesMonthlyTotals =
  useGetInvoicesMonthlyTotalsQuery as jest.Mock

describe('InvoiceListPage', () => {
  it('default render', () => {
    MockGetInvoicesList.mockReturnValue({
      data: fixtures.MockInvoiceList,
      error: false,
      loading: false
    })

    MockGetInvoicesMonthlyTotals.mockReturnValue({
      data: fixtures.MockInvoiceList,
      error: false,
      loading: false
    })
    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toHaveTextContent('Invoices')
    expect(getByTestId('InvoiceListTable')).toBeInTheDocument()
  })

  it('no data render', () => {
    MockGetInvoicesList.mockReturnValue({
      data: null,
      error: false,
      loading: false
    })

    MockGetInvoicesMonthlyTotals.mockReturnValue({
      data: null,
      error: false,
      loading: false
    })
    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toHaveTextContent('Invoices')
    expect(getByTestId('InvoiceListTable')).toContainHTML('"data":null')
  })
})
