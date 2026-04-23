import { FinalForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import React, { ComponentProps } from 'react'
import { InvoicePaymentSources } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormSource from '.'

const render = (props: ComponentProps<typeof InvoicePayModalFormSource>) =>
  renderComponent(
    <FinalForm onSubmit={noop}>
      {() => <InvoicePayModalFormSource {...props} />}
    </FinalForm>
  )

describe('InvoicePayModalFormSource', () => {
  it('renders external payment form', () => {
    const { queryByTestId } = render({
      handleSubmit: noop,
      values: { paymentSource: InvoicePaymentSources.RECORD }
    })
    const externalForm = queryByTestId('InvoicePayModalFormExternal')

    expect(externalForm).not.toBeNull()
  })

  it('renders external payment ach', () => {
    const { queryByTestId } = render({
      handleSubmit: noop,
      values: { paymentSource: InvoicePaymentSources.ACH }
    })
    const achForm = queryByTestId('InvoicePayModalFormAch')

    expect(achForm).not.toBeNull()
  })

  it('renders unapplied cash', () => {
    const { queryByTestId } = render({
      handleSubmit: noop,
      values: { paymentSource: InvoicePaymentSources.UNAPPLIED_CASH }
    })
    const unappliedCashForm = queryByTestId('InvoicePayModalFormUnappliedCash')

    expect(unappliedCashForm).not.toBeNull()
  })

  it('renders external payment credit card', () => {
    const { queryByTestId } = render({
      handleSubmit: noop,
      values: { paymentSource: InvoicePaymentSources.CREDIT_CARD }
    })
    const creditCardForm = queryByTestId('InvoicePayModalFormCreditCard')

    expect(creditCardForm).not.toBeNull()
  })

  it('renders external payment receipt', () => {
    const { queryByTestId } = render({
      handleSubmit: noop,
      values: { paymentSource: InvoicePaymentSources.PENDING_RECEIPT }
    })
    const receiptForm = queryByTestId('InvoicePayModalFormReceipt')

    expect(receiptForm).not.toBeNull()
  })
})
