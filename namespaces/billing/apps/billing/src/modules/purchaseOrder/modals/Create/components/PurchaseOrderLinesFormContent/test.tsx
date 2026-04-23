import { Form, arrayMutators } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderLinesFormContent from '.'

const initialValues = {
  clientId: 'Client name',
  number: '1522',
  purchaseOrderLinesAttributes: []
}
const render = (props?: ComponentProps<typeof PurchaseOrderLinesFormContent>) =>
  renderComponent(
    <Form
      mutators={{ ...arrayMutators }}
      initialValues={initialValues}
      onSubmit={jest.fn()}
      {...props}
    >
      <PurchaseOrderLinesFormContent />
    </Form>
  )

describe('PurchaseOrderLinesFormContent', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('addPOLine')).toBeInTheDocument()
  })
})
