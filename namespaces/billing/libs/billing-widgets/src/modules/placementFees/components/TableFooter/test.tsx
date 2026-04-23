import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableFooter from '.'

const render = (props: ComponentProps<typeof TableFooter>) =>
  renderComponent(
    <table>
      <TableFooter {...props} />
    </table>
  )

describe('PlacementFeeTableFooter', () => {
  it('default render', () => {
    const { getByTestId } = render({
      totals: {
        creditCommissions: '99',
        creditCompany: '45',
        debitCommissions: '78',
        debitCompany: '55',
        paidCommissions: '12',
        paidCompany: '1255'
      }
    })

    expect(getByTestId('total-paid-company')).toContainHTML('$1,255.00')
    expect(getByTestId('total-paid-commissions')).toContainHTML('$12.0')
    expect(getByTestId('total-debits-company')).toContainHTML('$55.0')
    expect(getByTestId('total-debits-commissions')).toContainHTML('$78.00')
    expect(getByTestId('total-credits-company')).toContainHTML('$45.0')
    expect(getByTestId('total-credits-commissions')).toContainHTML('$99.00')
  })
})
