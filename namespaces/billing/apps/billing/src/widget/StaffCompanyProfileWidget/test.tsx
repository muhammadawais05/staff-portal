import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffCompanyProfileWidget from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commission/components/Commission'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/billingInfo/components/BasicBillingInfo'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/billingDetails/components/BillingDetails'
)
jest.mock('@staff-portal/billing/src/components/Modals')

const render = () =>
  renderComponent(
    <StaffCompanyProfileWidget
      endpoints={fixtures.MockEndpoints}
      companyId='VjEtQ29tcGFueS0xMjM0NQ'
    />
  )

describe('StaffCompanyProfileWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BasicBillingInfo')).toBeInTheDocument()
    expect(getByTestId('BasicBillingInfo-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Commission')).toBeInTheDocument()
    expect(getByTestId('Commission-nodeId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('BillingDetails')).toBeInTheDocument()
    expect(getByTestId('BillingDetails-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
