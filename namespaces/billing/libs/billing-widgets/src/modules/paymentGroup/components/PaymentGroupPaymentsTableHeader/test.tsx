import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupPaymentsTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <PaymentGroupPaymentsTableHeader />
    </Table>
  )

describe('PaymentGroupPaymentsTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(
      queryByTestId('PaymentGroupPaymentsTableHeader-head')
    ).toBeInTheDocument()
  })
})
