import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetPaymentGroupDetailsTotalsQuery } from '../../data'
import PaymentGroupTotals from '.'

jest.mock('../../data')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals'
)

const render = (props: ComponentProps<typeof PaymentGroupTotals>) =>
  renderComponent(<PaymentGroupTotals {...props} />)

describe('PaymentGroupTotals', () => {
  it('default render', () => {
    ;(useGetPaymentGroupDetailsTotalsQuery as jest.Mock).mockReturnValue({
      data: {
        node: {
          payments: fixtures.MockPaymentGroupDetails.payments
        }
      },
      loading: false
    })

    const { getByTestId } = render({
      paymentGroupId: 'abc123'
    })

    expect(getByTestId('ListTotals')).toBeInTheDocument()
    expect(getByTestId('ListTotals-totals')).toContainHTML(
      '{"__typename":"PaymentsTotals","debited":"7713398.34","disputed":"28715.74","due":"107863.74","onHold":"37767.5","outstanding":"13837253.09","overdue":"459784.53","paid":"590996848.7"}'
    )
    expect(getByTestId('ListTotals-sortOrder')).toContainHTML(
      `["outstanding","due","overdue","onHold","disputed","debited","paid"]`
    )
  })
})
