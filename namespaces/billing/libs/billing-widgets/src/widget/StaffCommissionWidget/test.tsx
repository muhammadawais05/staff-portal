import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffCommissionWidget from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/commission/components/Commission')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')

const render = () =>
  renderComponent(
    <StaffCommissionWidget
      endpoints={fixtures.MockEndpoints}
      nodeId='VjEtQ29tcGFueS0xMjM0NQ'
    />
  )

describe('StaffCommissionWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('Commission')).toBeInTheDocument()
    expect(getByTestId('Commission-nodeId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
