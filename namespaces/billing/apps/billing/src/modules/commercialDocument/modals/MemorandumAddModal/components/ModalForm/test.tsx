import React, { ComponentProps } from 'react'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import MemorandumAddModalForm from '.'

jest.mock('@staff-portal/billing/src/_lib/form/fieldValidators')
jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('../ModalFormReceiver')

const render = (
  props: Omit<ComponentProps<typeof MemorandumAddModalForm>, 'formProps'>,
  initialValues = {}
) =>
  renderComponent(
    <Form onSubmit={jest.fn()} initialValues={initialValues}>
      <FormSpy subscription={{ initialValues: true, modified: true }}>
        {formProps => (
          <MemorandumAddModalForm formProps={formProps} {...props} />
        )}
      </FormSpy>
    </Form>
  )

describe('MemorandumAddModalForm', () => {
  it('invoice render', () => {
    const { container, queryByTestId } = render({
      document: {
        ...fixtures.MockInvoice,
        invoiceKind: InvoiceKind.CONSOLIDATED,
        originalInvoices: {
          nodes: [fixtures.MockInvoice]
        }
      },
      nodeType: CommercialDocumentType.invoice
    })

    expect(queryByTestId('memo-select-originalInvoiceId')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('invoice render without original invoices', () => {
    const { queryByTestId } = render({
      document: {
        ...fixtures.MockInvoice,
        invoiceKind: InvoiceKind.CONSOLIDATED
      },
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      queryByTestId('memo-select-originalInvoiceId')
    ).not.toBeInTheDocument()
  })

  it('payment render', () => {
    const { container } = render({
      document: fixtures.MockPayment,
      nodeType: CommercialDocumentType.payment
    })

    expect(container).toMatchSnapshot()
  })

  it('role render', () => {
    const { container } = render({
      showReceiverField: true
    })

    expect(container).toMatchSnapshot()
  })
})

describe('affectsCommissionsWarning', () => {
  it('do not render warning when affects commissions checked', () => {
    const { queryByTestId } = render(
      {
        nodeType: CommercialDocumentType.invoice,
        document: {
          ...fixtures.MockInvoice,
          commissionable: true
        }
      },
      {
        affectsCommissions: true
      }
    )

    expect(
      queryByTestId('ModalFormCommissionsWarning-affects-commissions-warning')
    ).not.toBeInTheDocument()
  })

  it('render warning when affects commissions is not checked', () => {
    const { queryByTestId } = render(
      {
        nodeType: CommercialDocumentType.invoice,
        document: {
          ...fixtures.MockInvoice,
          commissionable: true
        }
      },
      {
        affectsCommissions: false
      }
    )

    expect(
      queryByTestId('ModalFormCommissionsWarning-affects-commissions-warning')
    ).toBeInTheDocument()
  })
})
