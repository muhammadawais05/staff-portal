import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentsHistoryModalForm from '.'

jest.mock(
  '@staff-portal/billing/src/components/FormInputDatePicker/FormInputDatePicker'
)
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = () =>
  renderComponent(<PaymentsHistoryModalForm handleOnSubmit={jest.fn()} />)

describe('PaymentsHistoryModalForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('startDate')).toBeInTheDocument()
    expect(getByTestId('endDate')).toBeInTheDocument()
  })
})
