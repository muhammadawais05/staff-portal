import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MyExpectedCommissionListPage from '.'

jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('../../components/ExpectedCommissionsListTable')
jest.mock('../../components/ExpectedCommissionsListSearch')
jest.mock('../../components/ExpectedCommissionsPageActions', () => () => <></>)
jest.mock('../../components/ExpectedComissionsTotals', () => () => <></>)

const render = () => renderComponent(<MyExpectedCommissionListPage />)

describe('MyExpectedCommissionListPage', () => {
  it('renders properly', () => {
    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toContainHTML('Expected commissions')
    expect(getByTestId('ExpectedCommissionsListTable')).toBeInTheDocument()
  })
})
