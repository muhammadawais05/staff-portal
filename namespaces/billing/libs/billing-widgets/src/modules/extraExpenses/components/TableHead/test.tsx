import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableHead from '.'

const render = (props: ComponentProps<typeof TableHead>) =>
  renderComponent(
    <table>
      <TableHead {...props} />
    </table>
  )

describe('TableHead', () => {
  it('default render', () => {
    const { getAllByRole } = render({})

    const cells = getAllByRole('columnheader')

    expect(cells).toHaveLength(4)
    expect(cells[0]).toContainHTML('Date')
    expect(cells[1]).toContainHTML('Company')
    expect(cells[2]).toContainHTML('Talent')
    expect(cells[3]).toContainHTML('Commissions')
  })
})
