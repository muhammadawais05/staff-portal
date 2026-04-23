import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NextPurchaseOrderEdit from '.'

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

const render = () => renderComponent(<NextPurchaseOrderEdit jobId='123' />)

describe('PurchaseOrderEditModal', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('edit')).toBeInTheDocument()
  })
})
