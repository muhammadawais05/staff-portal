import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableHead from '.'

const render = () =>
  renderComponent(
    <table>
      <TableHead />
    </table>
  )

describe('PlacementFeesTableHead', () => {
  it('default render', () => {
    const { getAllByRole } = render()

    const headers = getAllByRole('columnheader')

    expect(headers[0]).toContainHTML('Due Date')
    expect(headers[1]).toContainHTML('Amount')
    expect(headers[2]).toContainHTML('Commissions')
    expect(headers[3]).toContainHTML('Description')
  })
})
