import MockDate from 'mockdate'
import React from 'react'
import { getCurrentTime } from '@staff-portal/billing/src/_lib/dateTime'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'

import CommercialDocumentUpdateDueDateModalForm from '.'
const mockInvoiceId = 'invoiceId//test'

jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    state: { modal: { options: { invoiceId: mockInvoiceId } } }
  })
}))
jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('@toptal/picasso-forms', () => {
  const PicassoForms = jest.requireActual('@toptal/picasso-forms')

  PicassoForms.Form.DatePicker = jest.fn()

  return PicassoForms
})

const FormDatePickerMock = Form.DatePicker as unknown as jest.Mock

const render = () =>
  renderComponent(
    <CommercialDocumentUpdateDueDateModalForm
      nodeId='123456'
      nodeType='invoice'
      documentNumber={123456}
      initialValues={{
        comment: '',
        dueDate: getCurrentTime().toJSDate()
      }}
      handleOnSubmit={jest.fn()}
    />
  )

describe('InvoiceUpdateDueDateModalForm', () => {
  beforeEach(() => {
    MockDate.set('2019-01-01T19:00:00.000+00:00')

    FormDatePickerMock.mockReturnValueOnce(null)
  })

  afterEach(() => MockDate.reset())

  it('default render', () => {
    render()

    expect(
      screen.getByTestId('CommercialDocumentUpdateDueDateModalForm')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Update due date of Invoice #123456')
    ).toBeInTheDocument()
    expect(FormDatePickerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Due date',
        name: 'dueDate',
        weekStartsOn: 0,
        required: true,
        minDate: new Date('2019-01-01T00:00:00.000Z')
      }),
      {}
    )
    expect(screen.getByTestId('comment')).toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeInTheDocument()
  })
})
