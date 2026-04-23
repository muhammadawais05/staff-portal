import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RevertPrepaymentModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const mockProps = {
  handleOnSubmit: jest.fn(),
  amount: fixtures.MockMemorandum.amount,
  documentNumber: fixtures.MockMemorandum.documentNumber,
  memoNumber: fixtures.MockMemorandum.number,
  initialValues: {
    comment: '',
    invoiceId: fixtures.MockMemorandum.document.id,
    memorandumId: fixtures.MockMemorandum.id
  }
}

const render = (props: ComponentProps<typeof RevertPrepaymentModalForm>) =>
  renderComponent(<RevertPrepaymentModalForm {...props} />)

describe('RevertPrepaymentModalForm', () => {
  it('default render', () => {
    const { container } = render(mockProps)

    expect(container).toMatchSnapshot()
  })
})
