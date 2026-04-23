import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentConvertToCreditMemoModalForm from '.'

const render = (
  props: Omit<
    ComponentProps<typeof PaymentConvertToCreditMemoModalForm>,
    'handleOnSubmit' | 'initialValues'
  >
) =>
  renderComponent(
    <PaymentConvertToCreditMemoModalForm
      handleOnSubmit={jest.fn()}
      initialValues={{ comment: '' }}
      {...props}
    />
  )

describe('PaymentConvertToCreditMemoModalForm', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      paymentId: fixtures.MockPayment.id
    })

    expect(
      queryByTestId('PaymentConvertToCreditMemoModalForm-modal-title')
    ).toBeInTheDocument()
  })
})
