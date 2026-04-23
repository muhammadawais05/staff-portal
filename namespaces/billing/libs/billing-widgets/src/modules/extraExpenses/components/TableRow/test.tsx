import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRow from '.'

const render = (props: ComponentProps<typeof TableRow>) =>
  renderComponent(
    <table>
      <tbody>
        <TableRow {...props} />
      </tbody>
    </table>
  )

describe('TableRow', () => {
  it('default render', () => {
    const { getAllByRole } = render({
      data: fixtures.MockExtraExpenses.nodes[0]
    })

    const cells = getAllByRole('cell')

    expect(cells).toHaveLength(4)

    expect(cells[0]).toContainHTML('Feb 29, 2020')
    expect(cells[1]).toContainHTML('$11,111.00')
    expect(cells[2]).toContainHTML('$1,111.00')
    expect(cells[3]).toContainHTML('—')
  })
})
