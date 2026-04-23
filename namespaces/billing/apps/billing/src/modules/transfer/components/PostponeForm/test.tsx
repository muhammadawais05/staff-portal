import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'

import PostponeForm from './PostponeForm'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

jest.mock('@toptal/picasso-forms', () => {
  const PicassoForms = jest.requireActual('@toptal/picasso-forms')

  PicassoForms.Form.DatePicker = jest.fn()

  return PicassoForms
})

const FormDatePickerMock = Form.DatePicker as unknown as jest.Mock

const render = (
  props: Omit<ComponentProps<typeof PostponeForm>, 'handleOnSubmit'>
) => renderComponent(<PostponeForm {...props} handleOnSubmit={jest.fn()} />)

describe('PostponeForm', () => {
  beforeEach(() => {
    MockDate.set('2015-05-05')

    FormDatePickerMock.mockReturnValueOnce(null)
  })

  afterEach(() => MockDate.reset())

  it('default render', () => {
    render({
      initialValues: {
        invoiceId: 'abc1234',
        pendingReceiptOn: new Date(2015, 7, 20),
        transferId: 'bcd123',
        comment: ''
      }
    })

    expect(
      screen.getByText('Are you sure you want to postpone payment?')
    ).toBeInTheDocument()
    expect(FormDatePickerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'pendingReceiptOn',
        weekStartsOn: 0,
        required: true,
        label: 'Expected clearance date',
        minDate: new Date('2015-05-05T00:00:00.000Z')
      }),
      {}
    )
  })
})
