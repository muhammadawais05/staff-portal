import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceDisputeTalentModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props: ComponentProps<typeof InvoiceDisputeTalentModalForm>) =>
  renderComponent(<InvoiceDisputeTalentModalForm {...props} />)

describe('InvoiceDisputeTalentModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {
        comment: '',
        invoiceId: 'abc123'
      },
      invoiceDocumentNumber: '377249'
    })

    expect(getByTestId('InvoiceDisputeTalentModalForm-title')).toContainHTML(
      'Dispute talent payments of Invoice #377249'
    )
    expect(getByTestId('InvoiceDisputeTalentModalForm-intro')).toContainHTML(
      'Are you sure you want to dispute related talent payments for this invoice?'
    )
    expect(getByTestId('comment')).toContainHTML('Comment')
    expect(getByTestId('submit')).toContainHTML('Dispute Payments')
  })
})
