import {
  getObjectSumValues,
  setObjectKeysToSnakeCase,
  formatAsPercentage,
  formatAsNumber,
  getYesOrNo
} from '.'

describe('Shared helpers', () => {
  it('#getObjectSumValues', () => {
    expect(
      getObjectSumValues({ a: '5', b: '10', c: '', example: '100' }, [
        'example'
      ])
    ).toBe(15)
  })

  it('#setObjectKeysToSnakeCase', () => {
    expect(
      setObjectKeysToSnakeCase({
        billingCycleGid: 'gid://testGid',
        test_key: 'testValue'
      })
    ).toEqual({ billing_cycle_gid: 'gid://testGid', test_key: 'testValue' })
  })

  describe('#formatAsNumber', () => {
    it.each`
      input           | expected
      ${'1.0'}        | ${'1.00'}
      ${'10.0'}       | ${'10.00'}
      ${'100.0'}      | ${'100.00'}
      ${'100.00'}     | ${'100.00'}
      ${'0.0'}        | ${'0.00'}
      ${'22.30'}      | ${'22.30'}
      ${'22.31'}      | ${'22.31'}
      ${'22.3145789'} | ${'22.31'}
      ${''}           | ${'0.00'}
    `(`will format '$input' --> '$expected'`, ({ input, expected }) => {
      const actual = formatAsNumber(input)

      expect(actual).toEqual(expected)
    })

    describe('when `precisionMax` set to `4`', () => {
      it.each`
        input           | expected
        ${'1.0'}        | ${'1.00'}
        ${'10.0'}       | ${'10.00'}
        ${'100.0'}      | ${'100.00'}
        ${'100.00'}     | ${'100.00'}
        ${'0.0'}        | ${'0.00'}
        ${'22.30'}      | ${'22.30'}
        ${'22.31'}      | ${'22.31'}
        ${'22.3145789'} | ${'22.3146'}
        ${''}           | ${'0.00'}
      `(`will format '$input' --> '$expected'`, ({ input, expected }) => {
        const actual = formatAsNumber(input, {
          precisionMax: 4
        })

        expect(actual).toEqual(expected)
      })
    })

    describe('when `precisionMin` set to `0`', () => {
      it.each`
        input           | expected
        ${'1.0'}        | ${'1'}
        ${'10.0'}       | ${'10'}
        ${'100.0'}      | ${'100'}
        ${'100.00'}     | ${'100'}
        ${'0.0'}        | ${'0'}
        ${'22.30'}      | ${'22.3'}
        ${'22.31'}      | ${'22.31'}
        ${'22.3145789'} | ${'22.31'}
        ${''}           | ${'0'}
      `(`will format '$input' --> '$expected'`, ({ input, expected }) => {
        const actual = formatAsNumber(input, {
          precisionMin: 0
        })

        expect(actual).toEqual(expected)
      })
    })
  })

  describe('#formatAsPercentage', () => {
    it.each`
      input           | expected
      ${'1.0'}        | ${'1.00%'}
      ${'10.0'}       | ${'10.00%'}
      ${'100.0'}      | ${'100.00%'}
      ${'100.00'}     | ${'100.00%'}
      ${'0.0'}        | ${'0.00%'}
      ${'22.30'}      | ${'22.30%'}
      ${'22.31'}      | ${'22.31%'}
      ${'22.3145789'} | ${'22.31%'}
      ${''}           | ${'0.00%'}
    `(`will format '$input' --> '$expected'`, ({ input, expected }) => {
      const actual = formatAsPercentage(input)

      expect(actual).toEqual(expected)
    })
  })

  describe('#getYesOrNo', () => {
    describe('when condition is true', () => {
      it('returns Yes', () => {
        expect(getYesOrNo(true)).toBe('Yes')
      })
    })

    describe('when condition is false', () => {
      it('returns No', () => {
        expect(getYesOrNo(false)).toBe('No')
      })
    })
  })
})
