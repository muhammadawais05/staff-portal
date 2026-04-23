import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentPayModalFormContent from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')
jest.mock('../AccountDetails')

const render = (props: ComponentProps<typeof PaymentPayModalFormContent>) => {
  return renderComponent(
    <Form onSubmit={jest.fn()}>
      <PaymentPayModalFormContent {...props} />
    </Form>
  )
}

describe('PaymentPayModalFormContent', () => {
  describe('when payment is not yet paid', () => {
    it('renders form', () => {
      const { queryByTestId } = render({
        amount: fixtures.MockPayment.balanceDue,
        paymentMethodRequired: true,
        subject: {
          ...fixtures.MockPayment.subject,
          paymentOptions: {
            nodes: [
              {
                accountInfo: [
                  {
                    label: 'testLabel1',
                    value: 'test value 1'
                  }
                ],
                paymentMethod: PaymentOptionPaymentMethod.PAYPAL,
                placeholder: false,
                preferred: false
              },
              {
                accountInfo: [
                  {
                    label: 'testLabel2',
                    value: ''
                  }
                ],
                paymentMethod: PaymentOptionPaymentMethod.ULTIPRO,
                placeholder: false,
                preferred: true
              },
              {
                accountInfo: [
                  {
                    label: 'Comment',
                    value: 'comment text'
                  }
                ],
                paymentMethod: PaymentOptionPaymentMethod.BANK_WIRE,
                placeholder: true,
                preferred: false
              }
            ]
          }
        }
      })

      expect(
        queryByTestId('PaymentPayModalForm-eligibilityNotice')
      ).not.toBeInTheDocument()

      expect(queryByTestId('AccountDetails')).toBeInTheDocument()
    })
  })

  describe('when it is not eligible to be paid out', () => {
    it('displays eligibility notice', () => {
      const { getByTestId } = render({
        ...fixtures.MockPayment,
        isEligibleToBePaidOut: false
      })

      expect(
        getByTestId('PaymentPayModalFormContent-eligibilityNotice')
      ).toBeInTheDocument()
    })
  })
})
