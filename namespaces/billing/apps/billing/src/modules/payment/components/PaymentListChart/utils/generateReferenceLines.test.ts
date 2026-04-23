import fixtures from '@staff-portal/billing/src/_fixtures'

import {
  generateReferenceLines,
  getFirstDateValue
} from './generateReferenceLines'

describe('generateReferenceLines helpers', () => {
  it('#getFirstDateValue', () => {
    expect(getFirstDateValue({ abc: 123, foo: 456 })).toBe(123)
  })

  it('#generateReferenceLines', () => {
    expect(
      generateReferenceLines(fixtures.MockKipperChart.thresholds_dates)
    ).toEqual([
      { y: 4, color: 'red' },
      { y: 2.5, color: 'orange' },
      { y: 0, color: 'green' }
    ])
  })
})
