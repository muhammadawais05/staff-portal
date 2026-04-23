import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PaymentGroupPaymentsActions from '.'

jest.mock('@staff-portal/billing/src/components/OperationWrapper')

const render = (props: ComponentProps<typeof PaymentGroupPaymentsActions>) =>
  renderComponent(<PaymentGroupPaymentsActions {...props} />)

const MockPayment =
  fixtures.MockPaymentGroupDetails.payments.groups[0].payments[0]

describe('PaymentGroupPaymentsActions', () => {
  describe('when remove available', () => {
    it(`will render two buttons`, () => {
      const { getByTestId } = render({
        payment: MockPayment
      })

      expect(
        getByTestId('PaymentGroupPaymentsActions-details')
      ).toBeInTheDocument()
      expect(
        getByTestId('PaymentGroupPaymentsActions-remove-payment')
      ).toBeInTheDocument()
    })
  })

  describe('when remove is not available', () => {
    it(`will render one button`, () => {
      const { getByTestId } = render({
        payment: {
          ...MockPayment,
          operations: {
            removePaymentFromPaymentGroup: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: ['Not available']
            }
          }
        }
      })

      expect(
        getByTestId('PaymentGroupPaymentsActions-details')
      ).toBeInTheDocument()
      expect(
        getByTestId('PaymentGroupPaymentsActions-remove-payment')
      ).toBeInTheDocument()
      expect(getByTestId('OperationWrapper-operation')).toContainHTML(
        'Not available'
      )
    })
  })

  describe('when `withheld` is `active', () => {
    it('sets `warning-type` properly', () => {
      const { getByTestId } = render({ payment: MockPayment })

      expect(
        getByTestId('PaymentGroupPaymentsActions-remove-payment')
      ).toHaveAttribute('data-warning-type', 'withheld')
    })
  })

  describe('when `withheld` is non active', () => {
    it('does not set `warning-type` properly', () => {
      const { getByTestId } = render({
        payment: {
          ...MockPayment,
          subjectObject: {
            ...MockPayment.subjectObject,
            operations: {
              removePaymentFromPaymentGroup: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: ['Not available']
              }
            }
          }
        }
      })

      expect(
        getByTestId('PaymentGroupPaymentsActions-remove-payment')
      ).not.toHaveAttribute('data-warning-type', 'withheld')
    })
  })
})
