import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UpdateAddTimesheetToInvoice from '.'
import adjustValues from './adjustVales'

jest.mock('../PurchaseOrderEditForm')
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

const render = () =>
  renderComponent(<UpdateAddTimesheetToInvoice jobId='123' />)

describe('UpdateAddTimesheetToInvoice', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('attachTimesheetsToInvoices')).toBeInTheDocument()
  })
})

describe('adjustValues', () => {
  it.each`
    attachTimesheetsToInvoices | expected
    ${'nil'}                   | ${{ attachTimesheetsToInvoices: undefined }}
    ${true}                    | ${{ attachTimesheetsToInvoices: true }}
    ${false}                   | ${{ attachTimesheetsToInvoices: false }}
  `(
    'returns proper output for $attachTimesheetsToInvoices value',
    ({ attachTimesheetsToInvoices, expected }) => {
      const actual = adjustValues({ attachTimesheetsToInvoices })

      expect(actual).toEqual(expected)
    }
  )
})
