import { FinalForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormExternal from '.'

const render = () =>
  renderComponent(
    <FinalForm onSubmit={noop}>
      {() => <InvoicePayModalFormExternal />}
    </FinalForm>
  )

describe('InvoicePayModalFormExternal', () => {
  it('default render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('external-payment-method')).toBeInTheDocument()
  })
})
