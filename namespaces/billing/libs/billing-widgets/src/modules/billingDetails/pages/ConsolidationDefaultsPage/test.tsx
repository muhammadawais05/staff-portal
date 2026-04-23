import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidationDefaultsPage from '.'

const TEST_CLIENT_ID = 'VjEtQ2xpZW50LTM3OTU4NA'

const render = (clientId = TEST_CLIENT_ID) =>
  renderComponent(<ConsolidationDefaultsPage clientId={clientId} />)

jest.mock('@staff-portal/billing/src/data')
jest.mock('../../../consolidationDefaults/data')

describe('ConsolidationDefaultsPage', () => {
  it('renders the component', () => {
    const { getByTestId } = render()

    expect(getByTestId('ConsolidationDefaultsPage')).toBeInTheDocument()
  })
})
