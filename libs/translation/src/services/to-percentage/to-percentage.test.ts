import { toPercentage } from './to-percentage'

describe('toPercentage', () => {
  it('formats string to percentage', () => {
    expect(toPercentage('10.54')).toBe('10.54%')
    expect(toPercentage('10')).toBe('10.00%')
    expect(toPercentage('10.54', { precisionMin: 1, precisionMax: 1 })).toBe(
      '10.5%'
    )
    expect(toPercentage('10', { precisionMin: 1, precisionMax: 1 })).toBe(
      '10.0%'
    )
  })

  it('formats number to percentage', () => {
    expect(toPercentage(10.54)).toBe('10.54%')
    expect(toPercentage(10)).toBe('10.00%')
    expect(toPercentage(10.54, { precisionMin: 1, precisionMax: 1 })).toBe(
      '10.5%'
    )
    expect(toPercentage(10, { precisionMin: 1, precisionMax: 1 })).toBe(
      '10.0%'
    )
  })
})
