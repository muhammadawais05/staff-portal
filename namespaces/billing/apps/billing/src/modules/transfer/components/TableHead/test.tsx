import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TransfersTableHead from '.'

const render = () =>
  renderComponent(
    <table>
      <TransfersTableHead />
    </table>
  )

describe('TransfersTableHead', () => {
  it('render header cells', () => {
    const { getByTestId } = render()

    expect(getByTestId('TransfersTableHead-status').textContent).toBe('Status')
    expect(getByTestId('TransfersTableHead-paymentMethod').textContent).toBe(
      'Payment Method'
    )
    expect(getByTestId('TransfersTableHead-amount').textContent).toBe('Amount')
    expect(getByTestId('TransfersTableHead-date').textContent).toBe('Date')
    expect(getByTestId('TransfersTableHead-details').textContent).toBe(
      'Details'
    )
  })
})
