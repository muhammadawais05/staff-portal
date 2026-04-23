import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Table from '.'

jest.mock('../TableRow')
jest.mock('../TableFooterRow')
jest.mock('../TableHead')

const render = (props: ComponentProps<typeof Table>) =>
  renderComponent(<Table {...props} />)

describe('Table', () => {
  it('default render', () => {
    const { queryAllByTestId } = render({
      data: fixtures.MockExtraExpenses
    })

    expect(queryAllByTestId('TableRow')).toHaveLength(2)
  })

  it('with null documents', () => {
    const { queryAllByTestId } = render({
      data: { ...fixtures.MockExtraExpenses, nodes: [] }
    })

    expect(queryAllByTestId('TableRow')).toHaveLength(0)
  })
})
