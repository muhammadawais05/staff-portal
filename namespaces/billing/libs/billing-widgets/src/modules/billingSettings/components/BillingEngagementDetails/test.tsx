import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingEngagementDetails from '.'

jest.mock('../../../billingCycles/components/BillingCycles')
jest.mock('../../data')
jest.mock('../../../timesheets/components/TimesheetListContainer', () => () => (
  <></>
))
jest.mock('../BillingCyclesSettings')
jest.mock('../ExtraExpensesList', () => () => <></>)
jest.mock('../PlacementFeesList', () => () => <></>)

describe('BillingEngagementDetails', () => {
  it('default render', () => {
    const { queryByTestId } = renderComponent(
      <BillingEngagementDetails jobId='12345' />
    )

    expect(queryByTestId('memorandums')).toHaveAttribute(
      'href',
      '/platform/staff/memos?engagement_id=171608'
    )
  })
})
