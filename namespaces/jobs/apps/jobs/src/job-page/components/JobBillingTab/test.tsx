import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobBillingTab from './JobBillingTab'

const WIDGET_TEST_ID = 'staff-billing-settings-widget'

jest.mock('@staff-portal/billing-widgets', () => ({
  StaffBillingSettingsWidget: () => <div data-testid={WIDGET_TEST_ID} />
}))

jest.mock('@staff-portal/billing', () => ({
  useBillingBaseProps: jest.fn()
}))

const JOB_ID = 'JOB_ID_1'
const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobBillingTab jobId={JOB_ID} />
    </TestWrapper>
  )

describe('JobBillingTab', () => {
  it('renders billing component with proper props', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(WIDGET_TEST_ID)).toBeInTheDocument()
  })
})
