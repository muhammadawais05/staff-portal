import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableHead from '.'

const render = (children: ReactNode, props: ComponentProps<typeof TableHead>) =>
  renderComponent(
    <table>
      <TableHead {...props}>{children}</TableHead>
    </table>
  )

describe('TableHead', () => {
  it('default render', () => {
    const { getAllByRole } = render(null, {})

    expect(getAllByRole('columnheader')).toHaveLength(9)
  })
})
