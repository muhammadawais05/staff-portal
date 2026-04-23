import React from 'react'
import { render, screen } from '@testing-library/react'

import DefaultDiscount from '.'

describe('DefaultDiscount', () => {
  describe.each([
    {
      case: 'full time and part time discount',
      fullTimeDiscount: '10',
      partTimeDiscount: '10',
      expected: '10% part time and 10% full time'
    },
    {
      case: 'full time discount',
      fullTimeDiscount: '10',
      partTimeDiscount: '',
      expected: '10% full time'
    },
    {
      case: 'part time discount',
      fullTimeDiscount: '',
      partTimeDiscount: '10',
      expected: '10% part time'
    }
  ])('when %s', ({ expected, fullTimeDiscount, partTimeDiscount }) => {
    it(`renders: ${expected}`, () => {
      render(
        <DefaultDiscount
          fullTimeDiscount={fullTimeDiscount}
          partTimeDiscount={partTimeDiscount}
        />
      )

      expect(screen.getByTestId('DefaultDiscount')).toHaveTextContent(expected)
    })
  })
})
