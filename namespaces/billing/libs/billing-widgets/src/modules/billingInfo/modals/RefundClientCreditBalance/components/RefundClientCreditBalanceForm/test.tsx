import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RefundClientCreditBalanceForm from '.'

jest.mock('@staff-portal/billing/src/store')
jest.mock('@staff-portal/billing/src/_lib/form/fieldValidators')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (amount = '100.0') =>
  renderComponent(
    <RefundClientCreditBalanceForm
      initialValues={{
        amount,
        clientId: '',
        notifyReceiver: false,
        comment: ''
      }}
      handleOnSubmit={jest.fn()}
      clientName='mock client name'
    />
  )

describe('RefundClientCreditBalanceForm', () => {
  it('default render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('RefundClientCreditBalanceForm-amount')).not.toBeNull()
    expect(
      queryByTestId('RefundClientCreditBalanceForm-comment')
    ).not.toBeNull()
    expect(
      queryByTestId('RefundClientCreditBalanceForm-notifyReceiver')
    ).not.toBeNull()
  })

  it('renders an alert if balance is zero', () => {
    const { queryByTestId } = render('0.0')

    expect(queryByTestId('RefundClientCreditBalanceForm-amount')).toBeNull()
    expect(queryByTestId('RefundClientCreditBalanceForm-comment')).toBeNull()
    expect(
      queryByTestId('RefundClientCreditBalanceForm-notifyReceiver')
    ).toBeNull()
    expect(
      queryByTestId('RefundClientCreditBalanceForm-zeroCreditBalance')
    ).toHaveTextContent('Credit balance is zero')
  })
})
