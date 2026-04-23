import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AssignPurchaseOrderModal from '.'

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
jest.mock('../../data', () => ({
  useGetPurchaseOrderLinesForInvoice: jest.fn().mockReturnValue({
    data: {},
    loading: false,
    initialLoading: false
  }),
  useAssignPurchaseOrderLineToInvoiceMutation: jest
    .fn()
    .mockReturnValue([jest.fn()])
}))

const render = (props: ComponentProps<typeof AssignPurchaseOrderModal>) =>
  renderComponent(<AssignPurchaseOrderModal {...props} />)

describe('AssignPurchaseOrderModal', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      options: { nodeId: '377249' }
    })

    expect(queryByTestId('modal-title')).toContainHTML(
      'Update purchase order number'
    )
  })
})
