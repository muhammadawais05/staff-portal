import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceNoteUpdateForm from '.'

const noop = () => {}

const render = () =>
  renderComponent(
    <Form onSubmit={noop}>
      <InvoiceNoteUpdateForm />
    </Form>
  )

describe('InvoiceNoteUpdateForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(
      getByTestId('InvoiceNoteUpdateForm-invoice-note')
    ).toBeInTheDocument()
  })
})
