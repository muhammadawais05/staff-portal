import { formatRate } from '.'

describe('formatRate', () => {
  it.each([
    [undefined, '0.00'],
    [null, '0.00'],
    ['', '0.00'],
    ['0', '0.00'],
    ['1', '1.00'],
    ['1.0', '1.00']
  ])('returns formatted rate', (unformatted, formatted) => {
    const result = formatRate(unformatted)

    expect(result).toBe(formatted)
  })
})
