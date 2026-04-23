import React from 'react'
import { parse } from '@staff-portal/billing/src/_lib/dateTime'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UpdateIssueDateModalForm from '.'

jest.mock(
  '@staff-portal/billing/src/components/FormInputDatePicker/FormInputDatePicker'
)
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const mockCreatedOn = '2019-01-01T19:00:00.000+00:00'

const render = () =>
  renderComponent(
    <UpdateIssueDateModalForm
      documentNumber={12345}
      initialValues={{
        invoiceId: '12345',
        comment: '',
        issueDate: parse(mockCreatedOn).toJSDate()
      }}
      minValue={mockCreatedOn}
      handleOnSubmit={jest.fn()}
    />
  )

describe('UpdateIssueDateModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('UpdateIssueDateModalForm-title')).toHaveTextContent(
      'Update issue date of Invoice'
    )
    expect(getByTestId('issueDate')).toBeInTheDocument()
    expect(getByTestId('comment')).toBeInTheDocument()
    expect(getByTestId('submit')).toBeInTheDocument()
  })
})
