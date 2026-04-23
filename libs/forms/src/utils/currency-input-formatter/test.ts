import { currencyInputFormatter } from './index'

describe('currencyInputFormatter', () => {
  describe('when `allowDecimals` option is `true`', () => {
    it.each([
      [-1, '0.00'],
      ['-1', '0.00'],
      [-0, '0.00'],
      [0, '0.00'],
      ['-0', '0.00'],
      ['0', '0.00'],
      ['00', '0.00'],
      [0.0, '0.00'],
      ['0000.000', '0.00'],
      [1, '1.00'],
      ['1', '1.00'],
      ['1.', '1.00'],
      [1.1, '1.10'],
      ['1.1', '1.10'],
      [1.123, '1.12'],
      ['1.123', '1.12'],
      ['.', '0.00'],
      ['.0', '0.00'],
      ['.1', '0.10'],
      ['.123', '0.12'],
      [',', ''],
      ['a', ''],
      ['abc123', ''],
      ['', ''],
      ['       ', ''],
      [undefined, ''],
      [null, '']
    ])('returns formatted currency value %s', (unformatted, formatted) => {
      const result = currencyInputFormatter({ allowDecimals: true })(
        unformatted
      )

      expect(result).toBe(formatted)
    })
  })

  describe('when `allowDecimals` option is `false`', () => {
    it.each([
      [-1, '0.00'],
      ['-1', '0.00'],
      [-0, '0.00'],
      [0, '0.00'],
      ['-0', '0.00'],
      ['0', '0.00'],
      ['00', '0.00'],
      [0.0, '0.00'],
      ['0000.000', '0.00'],
      [1, '1.00'],
      ['1', '1.00'],
      ['1.', '1.00'],
      [1.1, '1.00'],
      ['1.1', '1.00'],
      [1.123, '1.00'],
      ['1.123', '1.00'],
      ['.', '0.00'],
      ['.0', '0.00'],
      ['.1', '0.00'],
      ['.123', '0.00'],
      [',', ''],
      ['a', ''],
      ['abc123', ''],
      ['', ''],
      ['       ', ''],
      [undefined, ''],
      [null, '']
    ])('returns formatted currency value', (unformatted, formatted) => {
      const result = currencyInputFormatter({ allowDecimals: false })(
        unformatted
      )

      expect(result).toBe(formatted)
    })
  })

  describe('when `allowDecimals` option is `false` & `precision` is `0`', () => {
    it.each([
      [-1, '0'],
      ['-1', '0'],
      [-0, '0'],
      [0, '0'],
      ['-0', '0'],
      ['0', '0'],
      ['00', '0'],
      [0.0, '0'],
      ['0000.000', '0'],
      [1, '1'],
      ['1', '1'],
      ['1.', '1'],
      [1.1, '1'],
      ['1.1', '1'],
      [1.123, '1'],
      ['1.123', '1'],
      ['.', '0'],
      ['.0', '0'],
      ['.1', '0'],
      ['.123', '0'],
      [',', ''],
      ['a', ''],
      ['abc123', ''],
      ['', ''],
      ['       ', ''],
      [undefined, ''],
      [null, '']
    ])('returns formatted currency value', (unformatted, formatted) => {
      const result = currencyInputFormatter({
        allowDecimals: false,
        precision: 0
      })(unformatted)

      expect(result).toBe(formatted)
    })
  })
})
