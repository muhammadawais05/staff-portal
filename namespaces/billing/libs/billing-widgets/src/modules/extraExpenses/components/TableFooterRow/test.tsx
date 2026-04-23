import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableFooterRow from '.'

const render = (props: ComponentProps<typeof TableFooterRow>) =>
  renderComponent(
    <table>
      <tbody />
      <tfoot>
        <TableFooterRow {...props} />
      </tfoot>
    </table>
  )

describe('TableFooterRow', () => {
  it('default render', () => {
    const { getByTestId } = render({
      data: fixtures.MockExtraExpenses.extraExpenseTotals,
      type: 'paid'
    })

    expect(getByTestId('TableFooterRow-paid')).toContainHTML('Total Paid')
    expect(getByTestId('paidCompany')).toContainHTML('$120.25')
    expect(getByTestId('paidTalent')).toContainHTML('$110.25')
  })

  it('renders zero values', () => {
    const { getByTestId } = render({
      data: fixtures.MockExtraExpenses.extraExpenseTotals,
      type: 'credit'
    })

    expect(getByTestId('TableFooterRow-credit')).toContainHTML('Total Credits')
    expect(getByTestId('creditCompany')).toContainHTML('$0.00')
  })
})
