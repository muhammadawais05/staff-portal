import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnappliedCashEntriesTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <UnappliedCashEntriesTableHeader />
    </Table>
  )

describe('UnappliedCashEntriesTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('date-received-header')).toBeInTheDocument()
    expect(queryByTestId('original-amount-header')).toBeInTheDocument()
    expect(queryByTestId('balance-header')).toBeInTheDocument()
  })
})
