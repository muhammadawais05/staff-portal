import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffBillingSettingsWidget from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/billingSettings/components/BillingEngagementDetails')
jest.mock('../../modules/billingSettings/components/InvoiceSettings')
jest.mock('../../modules/billingSettings/data')
jest.mock('@staff-portal/billing/src/utils')

const render = (props: ComponentProps<typeof StaffBillingSettingsWidget>) =>
  renderComponent(<StaffBillingSettingsWidget {...props} />)

describe('StaffBillingSettingsWidget', () => {
  it('renders all required components', () => {
    const { getByTestId } = render({})

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
