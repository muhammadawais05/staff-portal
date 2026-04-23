import React from 'react'
import { Form } from '@toptal/picasso-forms'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { GetPaymentGroupPayModalQuery } from '../../data'
import PaymentGroupPayModalForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('../../../../../payment/components/PaymentPayModalFormContent')

const render = (
  paymentGroup: Exclude<GetPaymentGroupPayModalQuery['node'], null | undefined>
) => {
  return renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentGroupPayModalForm paymentGroup={paymentGroup} />
    </Form>
  )
}

describe('PaymentGroupPayModalForm', () => {
  describe('when payment is not yet paid', () => {
    it('renders form', () => {
      const { queryByTestId } = render({
        ...fixtures.MockPaymentGroup,
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
        ...fixtures.MockPaymentGroup,
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
