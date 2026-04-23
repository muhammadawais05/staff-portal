import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { InvoicePayModalFormValues } from '@staff-portal/billing/src/_lib/helpers/billing'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props?: ComponentProps<typeof InvoicePayModalForm>) =>
  renderComponent(
    <FinalForm
      render={(formRenderProps: FormRenderProps<InvoicePayModalFormValues>) => (
        <InvoicePayModalForm
          invoice={fixtures.MockInvoice}
          formRenderProps={formRenderProps}
          {...props}
        />
      )}
      initialValues={{
        amount: fixtures.MockInvoice.amount,
        comment: '',
        paymentSource: ''
      }}
      onSubmit={jest.fn()}
    />
  )

describe('InvoicePayModalForm', () => {
  it('default render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('InvoicePayModalForm-title')).toBeInTheDocument()
    expect(
      queryByTestId('InvoicePayModalForm-amountToPay')
    ).not.toBeInTheDocument()
  })

  describe('when discount is applied', () => {
    it('renders amount to pay field', () => {
      const { queryByTestId } = render({
        invoice: { ...fixtures.MockInvoice, discountApplied: true }
      })

      expect(queryByTestId('InvoicePayModalForm-title')).toBeInTheDocument()
      expect(
        queryByTestId('InvoicePayModalForm-amountToPay')
      ).toBeInTheDocument()
    })
  })
})
