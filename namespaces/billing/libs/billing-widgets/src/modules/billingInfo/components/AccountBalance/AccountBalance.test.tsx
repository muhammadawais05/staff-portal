import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Amount } from '@toptal/picasso'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import AccountBalance from './AccountBalance'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Amount: jest.fn()
}))

const renderComponent = (props?: ComponentProps<typeof AccountBalance>) =>
  render(
    <TestWrapper>
      <AccountBalance {...props} />
    </TestWrapper>
  )

const mockedAmount = Amount as unknown as jest.Mock

describe('AccountBalance', () => {
  beforeEach(() => {
    mockedAmount.mockReset()
    mockedAmount.mockReturnValueOnce(null)
  })

  describe('when accountBalance is not available', () => {
    it('renders empty sign', () => {
      const { getByTestId, queryByTestId } = renderComponent()

      expect(getByTestId('AccountBalance-empty-data').textContent).toBe(
        EMPTY_DATA
      )
      expect(mockedAmount).toHaveBeenCalledTimes(0)
      expect(queryByTestId('AccountBalance-link')).not.toBeInTheDocument()
    })
  })

  describe('when accountBalance is provided, but url is not available', () => {
    it('renders Account Balance Amount', () => {
      const accountBalance = '100'
      const { queryByTestId } = renderComponent({
        accountBalance
      })

      expect(mockedAmount).toHaveBeenCalledTimes(1)
      expect(mockedAmount).toHaveBeenCalledWith(
        {
          amount: accountBalance,
          color: undefined,
          'data-testid': 'AccountBalance-accountBalanceAmount',
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(queryByTestId('AccountBalance-empty-data')).not.toBeInTheDocument()
      expect(queryByTestId('AccountBalance-link')).not.toBeInTheDocument()
    })
  })

  describe('when both accountBalance and url are provided', () => {
    it('renders a link with Account Balance Amount', () => {
      const accountBalance = '100'
      const accountBalanceUrl = 'test'

      const { queryByTestId, getByTestId } = renderComponent({
        accountBalance: '100',
        accountBalanceUrl
      })

      expect(mockedAmount).toHaveBeenCalledTimes(1)
      expect(mockedAmount).toHaveBeenCalledWith(
        {
          amount: accountBalance,
          color: 'inherit',
          'data-testid': 'AccountBalance-accountBalanceAmount',
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )
      expect(queryByTestId('AccountBalance-empty-data')).not.toBeInTheDocument()
      expect(getByTestId('AccountBalance-link')).toBeInTheDocument()
      expect(getByTestId('AccountBalance-link')).toHaveAttribute(
        'href',
        accountBalanceUrl
      )
    })
  })
})
