import { FinalForm, FormRenderProps } from '@toptal/picasso-forms'
import React from 'react'
import { CollectBadDebtInvoiceInput } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceCollectBadDebtModalForm from '.'

const mockInvoiceId = 'invoiceId//test'

jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    state: { modal: { options: { invoiceId: mockInvoiceId } } }
  })
}))

const render = () =>
  renderComponent(
    <FinalForm
      render={(
        formRenderProps: FormRenderProps<CollectBadDebtInvoiceInput>
      ) => (
        <InvoiceCollectBadDebtModalForm
          invoiceDocumentNumber={123456}
          formRenderProps={formRenderProps}
        />
      )}
      initialValues={{ comment: '' }}
      onSubmit={jest.fn()}
    />
  )

describe('InvoiceCollectBadDebtModalForm', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
