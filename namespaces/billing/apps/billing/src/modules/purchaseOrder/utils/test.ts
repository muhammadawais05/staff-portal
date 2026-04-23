import { getColorByConditions, getColorByValues } from '.'

describe('#getColorForTotal', () => {
  it.each`
    budgetSpent  | thresholdReached | expected
    ${true}      | ${true}          | ${'yellow'}
    ${false}     | ${true}          | ${'yellow'}
    ${true}      | ${false}         | ${'red'}
    ${false}     | ${false}         | ${'dark-grey'}
    ${undefined} | ${undefined}     | ${'dark-grey'}
  `(
    'when `budgetSpent` is `$budgetSpent` & `thresholdReached` is `$thresholdReached` it will return `$expected`',
    ({ budgetSpent, thresholdReached, expected }) => {
      const actual = getColorByConditions({ budgetSpent, thresholdReached })

      expect(actual).toEqual(expected)
    }
  )
})

describe('#getColorForTotalByValues', () => {
  it.each`
    totalAmount   | invoicedAmount | threshold | expected
    ${'51200.00'} | ${'14720.00'}  | ${''}     | ${'dark-grey'}
    ${'7920.00'}  | ${'7920.00'}   | ${''}     | ${'red'}
    ${'12000.00'} | ${'7920.00'}   | ${'75'}   | ${'dark-grey'}
    ${'4500.00'}  | ${'5040.00'}   | ${'85'}   | ${'yellow'}
    ${'39600.00'} | ${'30800.00'}  | ${'75'}   | ${'yellow'}
    ${'39600.00'} | ${'30800.00'}  | ${'85'}   | ${'dark-grey'}
    ${'2400.00'}  | ${'2520.00'}   | ${''}     | ${'red'}
    ${'70000.00'} | ${'64280.00'}  | ${''}     | ${'dark-grey'}
    ${'42000.00'} | ${'12236.00'}  | ${'75'}   | ${'dark-grey'}
  `(
    'when `invoicedAmount` is `$invoicedAmount` & `totalAmount` is `$totalAmount` & threshold is `$threshold` it will return `$expected`',
    ({ totalAmount, invoicedAmount, threshold, expected }) => {
      const actual = getColorByValues({
        totalAmount,
        invoicedAmount,
        threshold
      })

      expect(actual).toEqual(expected)
    }
  )
})
