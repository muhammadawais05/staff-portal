import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Component from '.'
import { filterChartData } from './PaymentListChart'
import { usePaymentsChart } from '../../data'

jest.mock('../PaymentListChartTooltip')
jest.mock('../../data')
jest.mock('@staff-portal/charts', () => ({
  LineChart: jest.fn().mockImplementation(() => <div id='LineChart' />)
}))

const render = (props: ComponentProps<typeof Component>) =>
  renderComponent(<Component {...props} />)

describe('PaymentListChart', () => {
  it('default render', () => {
    ;(usePaymentsChart as jest.Mock).mockReturnValue({
      data: fixtures.MockKipperChart,
      loading: false,
      error: null
    })

    const { queryByTestId } = render({})

    expect(queryByTestId('PaymentListChart')).toBeInTheDocument()
  })

  it('loading render', () => {
    ;(usePaymentsChart as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: null
    })

    const { queryByTestId } = render({})

    expect(queryByTestId('PaymentListChart')).not.toBeInTheDocument()
  })

  it('#filterChartData', () => {
    expect(
      filterChartData([
        { x: '123', not_received: 123, paid_early: 123, date: '123' }
      ])
    ).toEqual([{ x: '123', not_received: 123, paid_early: 123 }])
  })
})
