import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupListTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <PaymentGroupListTableHeader />
    </Table>
  )

describe('PaymentGroupListTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(
      queryByTestId('PaymentGroupListTableHeader-head')
    ).toBeInTheDocument()
  })
})
