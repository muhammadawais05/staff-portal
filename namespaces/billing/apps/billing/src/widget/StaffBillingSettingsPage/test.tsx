import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffBillingSettingsPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/billingSettings/pages/BillingSettingsPage')

const render = (props: ComponentProps<typeof WidgetStaffBillingSettingsPage>) =>
  renderComponent(<WidgetStaffBillingSettingsPage {...props} />)

describe('StaffBillingSettingsPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render({})

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
