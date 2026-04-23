import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import CancelPaymentForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props: Omit<ComponentProps<typeof CancelPaymentForm>, 'handleOnSubmit'>
) =>
  renderComponent(<CancelPaymentForm handleOnSubmit={jest.fn()} {...props} />)

describe('CancelPaymentForm', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      documentNumber: fixtures.MockPayment.documentNumber.toString(),
      initialValues: {
        paymentId: fixtures.MockPayment.id,
        comment: ''
      }
    })

    expect(queryByTestId('CancelPaymentForm-title')).toHaveTextContent(
      'Cancel Payment #1104428'
    )
    expect(queryByTestId('CancelPaymentForm-intro')).toHaveTextContent(
      "By canceling payment you acknowledge that it was moved to the paid status by mistake, no real funds were transferred, and understand that this isn't going to affect anyones local account."
    )
    expect(queryByTestId('CancelPaymentForm-comment')).toBeInTheDocument()
    expect(queryByTestId('submit')).toBeInTheDocument()
  })
})
