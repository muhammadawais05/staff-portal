import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffExpectedCommissionListPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/counters')
jest.mock('../../modules/expectedCommission/page/ExpectedCommissionListPage')
jest.mock('@staff-portal/billing/src/components/Modals')

const render = (
  props: ComponentProps<typeof WidgetStaffExpectedCommissionListPage>
) => renderComponent(<WidgetStaffExpectedCommissionListPage {...props} />)

describe('WidgetStaffExpectedCommissionListPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('ScrollToTop')).toBeInTheDocument()
    expect(getByTestId('ExpectedCommissionListPage')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
