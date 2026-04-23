import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MonthlyTotalsAmount from '.'

jest.mock('../AmountWithStatusColor')

const render = (props: ComponentProps<typeof MonthlyTotalsAmount>) =>
  renderComponent(<MonthlyTotalsAmount {...props} />)

describe('MonthlyTotalsAmount', () => {
  describe.each([
    ['credited', '4018088.93'],
    ['disputed', '16628.32'],
    ['inCollections', '1324378.32'],
    ['outstanding', '19878148.36'],
    ['overdue', '2025589.53'],
    ['paid', '29314229.54'],
    ['pendingReceipt', '2324378.32'],
    ['writtenOff', '324378.32'],
    ['draft', '0.00']
  ])('invoices totals', (name, total) => {
    it(`renders total amount of type "${name}"`, () => {
      const { queryByTestId } = render({
        name,
        total: total as unknown as number
      })
      const amount = queryByTestId(`MonthlyTotalsAmount-${name}`)

      expect(amount).toBeInTheDocument()
      expect(amount).toHaveAttribute('data-amount')
      expect(amount).toHaveAttribute('data-status')
    })
  })

  describe.each([
    ['debited', '177502.39'],
    ['disputed', '6614.4'],
    ['due', '107863.74'],
    ['onHold', '0.0'],
    ['outstanding', '13837253.09'],
    ['overdue', '282720.39'],
    ['paid', '1994375.09']
  ])('payments totals', (name, total) => {
    it(`renders total amount of type "${name}"`, () => {
      const { queryByTestId } = render({
        name,
        total: total as unknown as number
      })
      const amount = queryByTestId(`MonthlyTotalsAmount-${name}`)

      expect(amount).toBeInTheDocument()
      expect(amount).toHaveAttribute('data-amount')
      expect(amount).toHaveAttribute('data-status')
    })
  })
})
