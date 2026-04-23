import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MonthlyTotalsAmount from '.'

const render = (props: ComponentProps<typeof MonthlyTotalsAmount>) =>
  renderComponent(<MonthlyTotalsAmount {...props} />)

describe('MonthlyTotalsAmount', () => {
  describe.each([
    ['amount', '1560.0'],
    ['amount', '46144.55']
  ])('expected commissions totals', (name, total) => {
    it(`renders total amount of type "${name}"`, () => {
      const { queryByTestId } = render({
        name,
        total: total as unknown as number
      })
      const amount = queryByTestId(`MonthlyTotalsAmount-${name}`)

      expect(amount).toBeInTheDocument()
    })
  })
})
