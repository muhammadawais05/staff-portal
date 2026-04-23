import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import MemorandumListDescription from '.'

const render = ({
  portions
}: ComponentProps<typeof MemorandumListDescription>) =>
  renderComponent(<MemorandumListDescription portions={portions} />)

describe('MemorandumListHeader', () => {
  it('renders nothing when no memorandums specified', () => {
    const { queryByTestId } = render({
      portions: undefined
    })

    expect(queryByTestId('MemorandumListDescription')).not.toBeInTheDocument()
  })

  it('renders single memorandum info', () => {
    const { queryAllByTestId } = render({
      portions: [fixtures.MockMemorandum]
    })

    const descriptions = queryAllByTestId('MemorandumListDescription')

    expect(descriptions).toHaveLength(1)
    expect(descriptions[0]?.innerHTML).toMatch(
      'Amount of $250.00 has been allocated to'
    )
    expect(descriptions[0]?.innerHTML).toMatch('#414280')
    expect(descriptions[0]?.innerHTML).toMatch('on Jun 8, 2020')
  })

  it('renders multiple memorandums info', () => {
    const { queryAllByTestId } = render({
      portions: [
        fixtures.MockMemorandum,
        { ...fixtures.MockMemorandum, id: 'test' }
      ]
    })

    const descriptions = queryAllByTestId('MemorandumListDescription')

    expect(descriptions).toHaveLength(2)
    expect(descriptions[1]?.innerHTML).toMatch(
      'Amount of $250.00 has been allocated to'
    )
    expect(descriptions[1]?.innerHTML).toMatch('#414280')
    expect(descriptions[1]?.innerHTML).toMatch('on Jun 8, 2020')
  })
})
