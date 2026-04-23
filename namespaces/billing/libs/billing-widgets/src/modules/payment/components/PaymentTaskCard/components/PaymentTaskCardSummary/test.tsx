import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentTaskSummary from '.'

const render = (props: ComponentProps<typeof PaymentTaskSummary>) =>
  renderComponent(<PaymentTaskSummary {...props} />)

describe('PaymentTaskSummary', () => {
  it('card is rendered properly', () => {
    const { getByTestId } = render({
      payment: fixtures.MockPayment
    })

    expect(getByTestId('TaskCardLayout.Summary')).toBeInTheDocument()
    expect(getByTestId('PaymentTaskSummary-status-label')).toContainHTML(
      'Status'
    )
    expect(getByTestId('PaymentTaskSummary-status-value')).toContainHTML('Due')
    expect(getByTestId('PaymentTaskSummary-status-variant')).toContainHTML(
      'value-red'
    )
    expect(getByTestId('PaymentTaskSummary-amount-label')).toContainHTML(
      'Amount'
    )
    expect(getByTestId('PaymentTaskSummary-amount-component')).toContainHTML(
      '$7.71'
    )
    expect(getByTestId('PaymentTaskSummary-balanceDue-label')).toContainHTML(
      'Balance Due'
    )
    expect(getByTestId('PaymentTaskSummary-balanceDue-amount')).toContainHTML(
      '$7.71'
    )
    expect(getByTestId('PaymentTaskSummary-dueDate-label')).toContainHTML(
      'Due Date'
    )
    expect(getByTestId('PaymentTaskSummary-dueDate-value')).toContainHTML(
      'Jul 21, 2020'
    )
  })
})
