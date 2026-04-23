import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingAmountAdjustment from '.'

const render = (props: ComponentProps<typeof BillingAmountAdjustment>) =>
  renderComponent(<BillingAmountAdjustment {...props} />)

describe('BillingAmountAdjustment', () => {
  describe('when `amount` is `0`', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        amount: 0,
        type: 'credits'
      })

      expect(
        queryByTestId('BillingAmountAdjustment-Amount')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `amount` is not `0`', () => {
    describe('and `type` is `credits`', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          amount: 2500,
          type: 'credits'
        })

        expect(queryByTestId('BillingAmountAdjustment-Label')).toContainHTML(
          'Credits:'
        )
        expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
          '$2,500.00'
        )
      })
    })

    describe('and `type` is `debits`', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          amount: 1700,
          type: 'debits'
        })

        expect(queryByTestId('BillingAmountAdjustment-Label')).toContainHTML(
          'Debits:'
        )
        expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
          '$1,700.00'
        )
      })
    })
  })
})
