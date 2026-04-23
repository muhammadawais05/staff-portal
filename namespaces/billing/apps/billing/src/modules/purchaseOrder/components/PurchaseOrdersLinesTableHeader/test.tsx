import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrdersLinesTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <PurchaseOrdersLinesTableHeader />
    </Table>
  )

describe('PurchaseOrdersLinesTableHeader', () => {
  it('renders table header', () => {
    const { queryByTestId } = render()

    expect(
      queryByTestId('PurchaseOrdersLinesTableHeader-head')
    ).toBeInTheDocument()
  })
})
