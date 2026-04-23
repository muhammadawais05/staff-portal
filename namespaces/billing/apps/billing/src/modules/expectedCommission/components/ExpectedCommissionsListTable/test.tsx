import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ExpectedCommissionsListTable from '.'

jest.mock('../ExpectedCommissionsListTableRow')

const render = (props: ComponentProps<typeof ExpectedCommissionsListTable>) =>
  renderComponent(<ExpectedCommissionsListTable {...props} />)

describe('ExpectedCommissionsListTable', () => {
  it('default render', () => {
    const { queryByTestId, queryAllByTestId } = render({
      expectedCommissions: {
        loading: false,
        initialLoading: false,
        data: fixtures.MockExpectedCommissionsList.expectedCommissions
      }
    })

    expect(
      queryByTestId('ExpectedCommissionsListTableHeader-head')
    ).toBeInTheDocument()

    expect(queryAllByTestId('ExpectedCommissionsListTableRow')).toHaveLength(4)
  })

  it('no results render', () => {
    const { queryByTestId } = render({
      expectedCommissions: {
        loading: false,
        initialLoading: false,
        data: { groups: [] }
      },
      totals: {
        data: undefined,
        loading: false,
        initialLoading: false
      }
    })

    expect(queryByTestId('ListTable-empty')).toBeInTheDocument()
  })
})
