import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingAmountAdjustments from '.'

const render = (props: ComponentProps<typeof BillingAmountAdjustments>) =>
  renderComponent(<BillingAmountAdjustments {...props} />)

describe('BillingAmountAdjustments', () => {
  describe('when `creditedAmount` is not equal to `0`', () => {
    describe('and `debitedAmount` is not equal to `0`', () => {
      it('default render', () => {
        const { queryAllByTestId } = render({
          document: {
            creditedAmount: 1700,
            debitedAmount: 2500
          }
        })

        const amounts = queryAllByTestId('BillingAmountAdjustment-Amount')

        expect(amounts[0]).toContainHTML('$1,700.00')
        expect(amounts[1]).toContainHTML('$2,500.00')
      })
    })

    describe('and `debitedAmount` is equal to `0`', () => {
      it('default render', () => {
        const { queryByTestId } = render({
          document: {
            creditedAmount: 1700,
            debitedAmount: 0
          }
        })

        expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
          '$1,700.00'
        )
      })
    })
  })

  describe('when `creditedAmount` is equal to `0`', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        document: {
          creditedAmount: 0,
          debitedAmount: 1500
        }
      })

      expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
        '$1,500.00'
      )
    })
  })
})
