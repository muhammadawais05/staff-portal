import { FinalForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormReceipt from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof InvoicePayModalFormReceipt>
) =>
  renderComponent(
    <FinalForm onSubmit={noop}>
      {() => (
        <InvoicePayModalFormReceipt {...props}>
          {children}
        </InvoicePayModalFormReceipt>
      )}
    </FinalForm>
  )

describe('InvoicePayModalFormReceipt', () => {
  it('default render', () => {
    const { container } = render(null, {})

    expect(container).toMatchSnapshot()
  })
})
