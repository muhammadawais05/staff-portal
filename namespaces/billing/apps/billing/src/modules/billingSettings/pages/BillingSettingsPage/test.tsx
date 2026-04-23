import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingSettingsPage from '.'

jest.mock(
  '@staff-portal/billing-widgets/src/modules/billingSettings/components/InvoiceSettings',
  () => () => <></>
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/billingSettings/components/BillingEngagementDetails',
  () => () => <></>
)
jest.mock('@staff-portal/billing-widgets/src/modules/billingSettings/data')

describe('BillingSettingsPage', () => {
  it('default render', () => {
    const { queryAllByRole } = renderComponent(
      <BillingSettingsPage jobId='123' />
    )

    expect(queryAllByRole('tab')).toHaveLength(2)
  })
})
