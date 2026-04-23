import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UpdateAddTimesheetToInvoiceForm from '.'

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
jest.mock('../../data')

const mockSubmit = jest.fn()

const render = () =>
  renderComponent(
    <Form onSubmit={mockSubmit}>
      <UpdateAddTimesheetToInvoiceForm />
    </Form>
  )

describe('UpdateAddTimesheetToInvoiceForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('attachTimesheetsToInvoices')).toBeInTheDocument()
  })
})
