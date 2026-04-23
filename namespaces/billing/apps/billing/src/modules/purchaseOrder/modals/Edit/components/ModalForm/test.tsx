import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderCreateModalForm from '.'

const render = (props: ComponentProps<typeof PurchaseOrderCreateModalForm>) =>
  renderComponent(<PurchaseOrderCreateModalForm {...props} />)

describe('PurchaseOrderCreateModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {}
    })

    expect(getByTestId('purchaseOrderModal-title')).toHaveTextContent(
      'Edit Purchase Order'
    )
  })
})
