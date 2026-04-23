import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingCyclesSettings from '.'

jest.mock('../BillingCyclesSettingsForm')
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../../billingCycles/data')
jest.mock('../../../engagement/data')
jest.mock('../../../billingCycleSettings/data')

const render = () =>
  renderComponent(<BillingCyclesSettings engagementId='123' />)

describe('BillingCyclesSettings', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('edit')).toBeInTheDocument()
  })
})
