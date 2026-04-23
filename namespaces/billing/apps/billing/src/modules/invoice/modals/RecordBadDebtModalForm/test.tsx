import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceRecordBadDebtModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props: ComponentProps<typeof InvoiceRecordBadDebtModalForm>) =>
  renderComponent(<InvoiceRecordBadDebtModalForm {...props} />)

describe('InvoiceRecordBadDebtModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {
        comment: '',
        invoiceId: 'abc123'
      },
      invoiceDocumentNumber: '377249'
    })

    expect(getByTestId('InvoiceRecordBadDebtModalForm-title')).toContainHTML(
      'Record Invoice #377249 as bad debt'
    )
    expect(getByTestId('comment')).toContainHTML('Comment')
    expect(getByTestId('submit')).toContainHTML('Record Bad Debt')
    expect(getByTestId('InvoiceRecordBadDebtModalForm-warning')).toContainHTML(
      'Are you sure you want to record this invoice as bad debt?'
    )
  })
})
