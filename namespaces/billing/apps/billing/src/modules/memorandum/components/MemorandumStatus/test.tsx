import React, { ComponentProps } from 'react'
import { MemorandumBalance } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MemorandumStatus from '.'

const render = (props: ComponentProps<typeof MemorandumStatus>) =>
  renderComponent(<MemorandumStatus {...props} />)

describe('MemorandumStatus', () => {
  describe('when `depositCorrection` true and `balance` is credit', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          depositCorrection: true,
          balance: MemorandumBalance.CREDIT
        }
      })

      expect(queryByTestId('MemorandumStatus-tooltip')).toBeInTheDocument()
      expect(queryByTestId('MemorandumStatus-content')?.innerHTML).toBe(
        'Credit'
      )
    })
  })

  describe('when `depositCorrection` false and `balance` is credit', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          depositCorrection: false,
          balance: MemorandumBalance.CREDIT
        }
      })

      expect(queryByTestId('MemorandumStatus-tooltip')).not.toBeInTheDocument()
      expect(queryByTestId('MemorandumStatus-content')?.innerHTML).toBe(
        'Credit'
      )
    })
  })

  describe('when `depositCorrection` true and `balance` is debit', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          depositCorrection: true,
          balance: MemorandumBalance.DEBIT
        }
      })

      expect(queryByTestId('MemorandumStatus-tooltip')).toBeInTheDocument()
      expect(queryByTestId('MemorandumStatus-content')?.innerHTML).toBe(
        'Debit'
      )
    })
  })

  describe('when `depositCorrection` false and `balance` is debit', () => {
    it('renders correctly', () => {
      const { queryByTestId } = render({
        memorandum: {
          depositCorrection: false,
          balance: MemorandumBalance.DEBIT
        }
      })

      expect(queryByTestId('MemorandumStatus-tooltip')).not.toBeInTheDocument()
      expect(queryByTestId('MemorandumStatus-content')?.innerHTML).toBe(
        'Debit'
      )
    })
  })
})
