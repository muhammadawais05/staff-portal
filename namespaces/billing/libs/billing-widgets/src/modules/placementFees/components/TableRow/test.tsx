import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRow from '.'

jest.mock('../../../billingTable/components/BillingCommissions')
jest.mock('../../../billingTable/components/BillingTableDocument')

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
    const { getByTestId } = render({
      data: fixtures.MockPlacementFees.nodes[0]
    })

    expect(getByTestId('due-date')).toContainHTML('Jan 30, 2020')
    expect(getByTestId('invoice')).toContainHTML('382006')
    expect(getByTestId('commissions')).toContainHTML('1')
    expect(getByTestId('description')).toContainHTML(
      "1/2 of placement fee for Cesar O'Keefe for [Enterprise] Full-stack Phoenix/Elixir developer."
    )
  })
})
