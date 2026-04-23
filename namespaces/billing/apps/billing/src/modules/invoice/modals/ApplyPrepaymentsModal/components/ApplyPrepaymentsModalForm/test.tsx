import { Form, FormRenderProps } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import { ApplyPrepaymentsInput } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceApplyPrepaymentsModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props: Omit<
    ComponentProps<typeof InvoiceApplyPrepaymentsModalForm>,
    'formProps'
  >
) =>
  renderComponent(
    <Form
      render={(formProps: FormRenderProps<ApplyPrepaymentsInput>) => (
        <InvoiceApplyPrepaymentsModalForm formProps={formProps} {...props} />
      )}
      initialValues={{
        amount: '0.0',
        invoiceId: 'invoiceId',
        manualAllocation: true
      }}
      onSubmit={jest.fn()}
    />
  )

describe('InvoiceApplyPrepaymentsModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      availablePrepaymentBalance: '1500.00',
      cleanAmountToPay: '1500.00',
      documentNumber: 1234
    })

    expect(
      getByTestId('InvoiceApplyPrepaymentsModalForm-submit')
    ).toBeInTheDocument()
  })
})
