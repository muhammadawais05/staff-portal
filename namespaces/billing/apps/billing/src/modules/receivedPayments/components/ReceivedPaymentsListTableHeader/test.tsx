import { Table } from '@toptal/picasso'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ReceivedPaymentsListTableHeader from '.'

const render = () =>
  renderComponent(
    <Table>
      <ReceivedPaymentsListTableHeader />
    </Table>
  )

describe('ReceivedPaymentsListTableHeader', () => {
  it('default render', () => {
    const { container, queryByTestId } = render()

    expect(
      queryByTestId('ReceivedPaymentsListTableHeader-head')
    ).toBeInTheDocument()
    expect(container.querySelectorAll('th')).toHaveLength(7)
  })
})
