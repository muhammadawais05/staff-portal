import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemorandumAmount from '.'

const render = (props: ComponentProps<typeof MemorandumAmount>) =>
  renderComponent(<MemorandumAmount {...props} />)

describe('MemorandumAmount', () => {
  describe('when `shouldShowAmountLeft` true', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          allocated: false,
          amount: '111.11',
          amountDue: '99.99',
          portions: [{ id: 'test' }]
        }
      })

      expect(queryByTestId('amount')).toContainHTML('$111.11')
      expect(queryByTestId('amount-left')).toContainHTML('$99.99')
    })
  })

  describe('when `shouldShowAmountLeft` false', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          allocated: true,
          amount: '111.11',
          amountDue: '99.99',
          portions: []
        }
      })

      expect(queryByTestId('amount')).toContainHTML('$111.11')
      expect(queryByTestId('amount-left')).toBeNull()
    })
  })
})
