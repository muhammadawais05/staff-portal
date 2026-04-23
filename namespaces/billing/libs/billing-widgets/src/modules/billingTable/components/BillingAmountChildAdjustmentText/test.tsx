import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import i18n from '@staff-portal/billing/src/utils/i18n'

import BillingAmountChildAdjustmentText from '.'

const render = (
  props: ComponentProps<typeof BillingAmountChildAdjustmentText>
) => renderComponent(<BillingAmountChildAdjustmentText {...props} />)

describe('BillingAmountChildAdjustmentText', () => {
  describe('`hasAdjustments` is `true` and `hasChildAdjustments` is `false`', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({
        document: {
          creditedAmount: 1700,
          debitedAmount: 0
        },
        hasChildAdjustments: false
      })

      expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
        '$1,700.00'
      )

      expect(
        queryByText(i18n.t('common:documents.hasChildAdjustments'))
      ).toBeNull()
    })
  })

  describe('`hasAdjustments` is `true` and `hasChildAdjustments` is `true`', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({
        document: {
          creditedAmount: 0,
          debitedAmount: 2500
        },
        hasChildAdjustments: true
      })

      expect(queryByTestId('BillingAmountAdjustment-Amount')).toContainHTML(
        '$2,500.00'
      )

      expect(
        queryByText(i18n.t('common:documents.hasChildAdjustments'))
      ).toBeInTheDocument()
    })
  })

  describe('`hasAdjustments` is `false` and `hasChildAdjustments` is `false`', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({
        document: {
          creditedAmount: 0,
          debitedAmount: 0
        },
        hasChildAdjustments: false
      })

      expect(queryByTestId('BillingAmountAdjustment-Amount')).toBeNull()

      expect(
        queryByText(i18n.t('common:documents.hasChildAdjustments'))
      ).toBeNull()
    })
  })

  describe('`hasAdjustments` is `false` and `hasChildAdjustments` is `true`', () => {
    it('default render', () => {
      const { queryByTestId, queryByText } = render({
        document: {
          creditedAmount: 0,
          debitedAmount: 0
        },
        hasChildAdjustments: true
      })

      expect(queryByTestId('BillingAmountAdjustment-Amount')).toBeNull()

      expect(
        queryByText(i18n.t('common:documents.hasChildAdjustments'))
      ).toBeInTheDocument()
    })
  })
})
