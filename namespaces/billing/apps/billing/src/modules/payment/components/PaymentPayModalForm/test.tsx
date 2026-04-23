import React from 'react'
import { Form } from '@toptal/picasso-forms'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { GetPayModalPaymentQuery } from '../../modals/Pay/data'
import PaymentPayModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('../PaymentPayModalFormContent')

const render = (
  payment: Exclude<GetPayModalPaymentQuery['node'], null | undefined>
) => {
  return renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentPayModalForm payment={payment} />
    </Form>
  )
}

describe('PaymentPayModalForm', () => {
  describe('when payment is not yet paid', () => {
    it('renders form', () => {
      const { queryByTestId } = render({
        ...fixtures.MockPayment,
        eligibleForPay: true,
        payments: {}
      })

      expect(queryByTestId('PaymentPayModalFormContent')).toBeInTheDocument()
      expect(queryByTestId('PaymentPayModalFormContent')).toHaveAttribute(
        'data-is-eligible-to-be-paid-out',
        'true'
      )
    })
  })

  describe('when it is not eligible to be paid out', () => {
    it('displays eligibility notice', () => {
      const { queryByTestId } = render({
        ...fixtures.MockPayment,
        eligibleForPay: false
      })

      expect(queryByTestId('PaymentPayModalFormContent')).toBeInTheDocument()
      expect(queryByTestId('PaymentPayModalFormContent')).toHaveAttribute(
        'data-is-eligible-to-be-paid-out',
        'false'
      )
    })
  })
})
