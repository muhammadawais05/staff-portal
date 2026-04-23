import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetInvoicesGrandTotalsQuery } from '../../data/getGrandTotalsInvoiceList.graphql.types'
import InvoiceListTotals from '.'

jest.mock('../../data/getGrandTotalsInvoiceList.graphql.types')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
)

const render = (
  children: ReactNode,
  props: ComponentProps<typeof InvoiceListTotals>
) =>
  renderComponent(<InvoiceListTotals {...props}>{children}</InvoiceListTotals>)

describe('InvoiceListTotals', () => {
  it('default render', () => {
    useGetInvoicesGrandTotalsQuery.mockReturnValue({
      data: fixtures.MockInvoiceList,
      loading: false
    })
    const { getByTestId } = render(null, {})

    expect(getByTestId('ListTotals')).toBeInTheDocument()
    expect(getByTestId('ListTotals-totals')).toContainHTML(
      '{"__typename":"InvoicesTotals","credited":"4018088.93","disputed":"16628.32","inCollections":"1324378.32","outstanding":"19878148.36","overdue":"2025589.53","paid":"29314229.54","pendingReceipt":"2324378.32","writtenOff":"324378.32","draft":"0.00"}'
    )
    expect(getByTestId('ListTotals-sortOrder')).toContainHTML(
      `["draft","outstanding","overdue","disputed","inCollections","writtenOff","pendingReceipt","credited","paid"]`
    )
  })
})
