import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnappliedCashEntriesTable from '.'

const input = [
  {
    id: '1',
    amount: '500.00',
    availableAmount: '100.00',
    effectiveDate: '2022-04-05'
  },
  {
    id: '2',
    amount: '150.00',
    availableAmount: '0.00',
    effectiveDate: '2022-05-05'
  }
]

const render = (props: ComponentProps<typeof UnappliedCashEntriesTable>) =>
  renderComponent(<UnappliedCashEntriesTable {...props} />)

describe('UnappliedCashEntriesTable', () => {
  it('renders table', () => {
    const { queryAllByTestId } = render({ nodes: input })

    expect(queryAllByTestId('unapplied-cash-entry-row')).toHaveLength(2)

    expect(queryAllByTestId('date-received')[0]).toHaveTextContent(
      'Apr 5, 2022'
    )
    expect(queryAllByTestId('original-amount')[0]).toHaveTextContent('$500.00')
    expect(queryAllByTestId('balance')[0]).toHaveTextContent('$100.00')

    expect(queryAllByTestId('date-received')[1]).toHaveTextContent(
      'May 5, 2022'
    )
    expect(queryAllByTestId('original-amount')[1]).toHaveTextContent('$150.00')
    expect(queryAllByTestId('balance')[1]).toHaveTextContent('$0.00')
  })
})
