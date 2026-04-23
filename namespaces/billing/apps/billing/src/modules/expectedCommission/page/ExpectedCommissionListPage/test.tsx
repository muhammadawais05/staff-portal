import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ExpectedCommissionListPage from '.'

jest.mock('@staff-portal/billing/src/components/ListPage')
jest.mock('../../components/ExpectedCommissionsListTable')
jest.mock('../../components/ExpectedCommissionsListSearch')

const render = () => renderComponent(<ExpectedCommissionListPage />)

describe('ExpectedCommissionListPage', () => {
  it('renders properly', () => {
    const { getByTestId } = render()

    expect(getByTestId('ListPage-title')).toContainHTML('Expected commissions')
    expect(getByTestId('ExpectedCommissionsListTable')).toBeInTheDocument()
  })
})
