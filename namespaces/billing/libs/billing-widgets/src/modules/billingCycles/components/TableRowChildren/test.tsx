import React, { ComponentProps, ReactNode } from 'react'
import { within } from '@testing-library/react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import TableRowChildren from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TableRowChildren>
) =>
  renderComponent(
    <table>
      <tbody>
        <TableRowChildren {...props}>{children}</TableRowChildren>
      </tbody>
    </table>
  )

describe('TableRowChildren', () => {
  it('default render', () => {
    const { getByTestId } = render(null, {
      childrenCycles: fixtures.MockConsolidatedBillingCycle.childrenCycles
    })

    const tableRowChildren = getByTestId('TableRowChildren')
    const innerTable = within(tableRowChildren).getByTestId('InnerTable')

    expect(innerTable).toBeInTheDocument()
    expect(within(innerTable).queryAllByRole('row')).toHaveLength(3)
  })
})
