import React, { ComponentProps, ReactNode } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetPaymentsGrandTotalsQuery } from '../../data/getGrandTotalsPaymentsList.graphql.types'
import PaymentListTotals from '.'

jest.mock('../../data/getGrandTotalsPaymentsList.graphql.types')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
)

const render = (
  children: ReactNode,
  props: ComponentProps<typeof PaymentListTotals>
) =>
  renderComponent(<PaymentListTotals {...props}>{children}</PaymentListTotals>)

describe('PaymentListTotals', () => {
  it('default render', () => {
    useGetPaymentsGrandTotalsQuery.mockReturnValue({
      data: fixtures.MockPaymentList,
      loading: false
    })
    const { getByTestId } = render(null, {})

    expect(getByTestId('ListTotals')).toBeInTheDocument()
    expect(getByTestId('ListTotals-totals')).toContainHTML(
      '{"__typename":"PaymentsTotals","debited":"7713398.34","disputed":"28715.74","due":"107863.74","onHold":"37767.5","outstanding":"13837253.09","overdue":"459784.53","paid":"590996848.7"}'
    )
    expect(getByTestId('ListTotals-sortOrder')).toContainHTML(
      `["outstanding","due","overdue","onHold","disputed","debited","paid"]`
    )
  })
})
