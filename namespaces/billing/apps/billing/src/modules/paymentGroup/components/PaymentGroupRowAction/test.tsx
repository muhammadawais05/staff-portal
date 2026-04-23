import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupRowAction from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')
jest.mock('@toptal/picasso/Icon', () => ({
  ReferralBonus16: ({ color }) => (
    <div data-testid='ReferralBonus16'>
      <span data-testid='ReferralBonus16-color'>{color}</span>
    </div>
  ),
  Overview16: () => <div data-testid='Overview16' />
}))

const MockPaymentGroup =
  fixtures.MockPaymentGroupList.paymentGroupsNullable.nodes[0]

const render = (props: ComponentProps<typeof PaymentGroupRowAction>) =>
  renderComponent(<PaymentGroupRowAction {...props} />)

describe('PaymentGroupRowAction', () => {
  describe('when `payPayment` is `enabled`', () => {
    it('renders components and icon with the proper color', () => {
      const { queryByTestId } = render({
        group: MockPaymentGroup
      })

      expect(queryByTestId('ReferralBonus16-color')).toContainHTML('green')
      expect(queryByTestId('pay-payment-group')).toBeInTheDocument()
      expect(queryByTestId('more-actions-button')).toBeInTheDocument()
      expect(queryByTestId('Overview16')).toBeInTheDocument()
      expect(queryByTestId('ReferralBonus16')).toBeInTheDocument()
    })
  })

  describe('when `payPaymentGroup` is `disabled`', () => {
    it('renders components and icon with the proper color', () => {
      const { queryByTestId } = render({
        group: {
          ...MockPaymentGroup,
          operations: {
            ...MockPaymentGroup.operations,
            payPaymentGroup: {
              callable: 'DISABLED',
              messages: ['example content rendered as tooltip']
            }
          }
        }
      })

      expect(queryByTestId('ReferralBonus16-color')).toContainHTML('black')

      expect(queryByTestId('pay-payment-group')).toBeInTheDocument()
      expect(queryByTestId('more-actions-button')).toBeInTheDocument()
      expect(queryByTestId('Overview16')).toBeInTheDocument()
      expect(queryByTestId('ReferralBonus16')).toBeInTheDocument()
    })
  })
})
