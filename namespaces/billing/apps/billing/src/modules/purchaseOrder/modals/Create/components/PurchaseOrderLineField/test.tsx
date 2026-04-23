import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderLinesFormContent from '.'

jest.mock('../CompanyAutocomplete')
jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  FormDatePickerWrapper: () => <div>null</div>
}))

const render = (props: ComponentProps<typeof PurchaseOrderLinesFormContent>) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <PurchaseOrderLinesFormContent {...props} />
    </Form>
  )

describe('PurchaseOrderLinesFormContent', () => {
  it('default render', () => {
    const { getByTestId, queryByTestId } = render({
      handleOnRemove: jest.fn(),
      index: 0,
      name: 'purchaseOrderLinesAttributes',
      showDelete: false
    })

    expect(getByTestId('purchase-order-line-field-number.0')).toHaveTextContent(
      'Line 1 Number'
    )

    expect(queryByTestId('delete-button.0')).not.toBeInTheDocument()
  })

  it('renders delete button', () => {
    const { queryByTestId } = render({
      handleOnRemove: jest.fn(),
      index: 0,
      name: 'purchaseOrderLinesAttributes',
      showDelete: true
    })

    expect(queryByTestId('delete-button.0')).toBeInTheDocument()
  })

  it('`disabled` also hides delete button', () => {
    const { queryByTestId } = render({
      handleOnRemove: jest.fn(),
      index: 0,
      name: 'purchaseOrderLinesAttributes',
      showDelete: false,
      disabled: true
    })

    expect(queryByTestId('delete-button.0')).not.toBeInTheDocument()
  })
})
