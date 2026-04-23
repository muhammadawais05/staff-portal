import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Table from '.'

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../TableRow')

const render = (props: ComponentProps<typeof Table>) =>
  renderComponent(<Table {...props} />)

describe('PlacementFeesTable', () => {
  it('default render', () => {
    const { queryAllByTestId } = render({
      documents: fixtures.MockPlacementFees
    })

    const rows = queryAllByTestId('TableRow')

    expect(rows).toHaveLength(2)
  })
})
