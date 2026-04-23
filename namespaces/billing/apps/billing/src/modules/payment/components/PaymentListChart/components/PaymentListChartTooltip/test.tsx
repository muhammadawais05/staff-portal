import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Component from '.'

const render = (props: ComponentProps<typeof Component>) =>
  renderComponent(<Component {...props} />)

describe('PaymentListChartTooltip', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      active: true,
      data: [
        {
          x: 'Oct 21',
          paid_early: 4.5,
          not_received: 100.5001,
          date: '2020-10-21'
        }
      ]
    })

    // TODO : FIX IT, SO CORRECT VALUES WILL BE SHOWN INSTEAD OF INVALID
    expect(queryByTestId('chart-title')).toContainHTML(
      'Invalid DateTime at invaliddatetime'
    )
    expect(queryByTestId('chart-not-received-value')).toContainHTML(
      'Payment not Received: %'
    )
    expect(queryByTestId('chart-paid-early-value')).toContainHTML(
      'Paid Early: %'
    )

    expect(queryByTestId('chart-timezone')).toContainHTML(
      '(UTC-05:00) America - New York'
    )
    // TODO: FIX IT
    expect(queryByTestId('chart-timezone')).toContainHTML(
      'Invalid DateTime at invaliddatetime'
    )
    expect(queryByTestId('chart-not-received')).toBeInTheDocument()
    expect(queryByTestId('chart-paid-early')).toBeInTheDocument()
  })

  it('with payload', () => {
    const { queryByTestId } = render({
      active: true,
      data: [
        {
          x: 'Oct 21',
          paid_early: 4.5,
          not_received: 100.5001,
          date: '2020-10-21'
        }
      ],
      payload: [
        {
          payload: {
            x: 'Oct 21',
            order: 0,
            paid_early: 4.5,
            not_received: 100.5001
          }
        }
      ]
    })

    expect(queryByTestId('chart-title')).toContainHTML(
      'Oct 21, 2020 at 11:59pm'
    )
    expect(queryByTestId('chart-not-received-value')).toContainHTML(
      'Payment not Received: 100.5001%'
    )
    expect(queryByTestId('chart-paid-early-value')).toContainHTML(
      'Paid Early: 4.5%'
    )
    expect(queryByTestId('chart-timezone')).toContainHTML(
      '(UTC-05:00) America - New York'
    )
    // TODO: FIX IT
    expect(queryByTestId('chart-timezone')).toContainHTML(
      'Invalid DateTime at invaliddatetime'
    )
    expect(queryByTestId('chart-not-received')).toBeInTheDocument()
    expect(queryByTestId('chart-paid-early')).toBeInTheDocument()
  })

  it('not active', () => {
    const { queryByTestId } = render({
      data: [
        {
          x: 'Oct 21',
          paid_early: 4.5,
          not_received: 100.5001,
          date: '2020-10-21'
        }
      ]
    })

    expect(queryByTestId('chart-title')).not.toBeInTheDocument()
    expect(queryByTestId('chart-not-received-value')).not.toBeInTheDocument()
    expect(queryByTestId('chart-paid-early-value')).not.toBeInTheDocument()
    expect(queryByTestId('chart-timezone')).not.toBeInTheDocument()
    expect(queryByTestId('chart-not-received')).not.toBeInTheDocument()
    expect(queryByTestId('chart-paid-early')).not.toBeInTheDocument()
  })
})
