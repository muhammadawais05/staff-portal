import { AggregatedTalentClientHourlyRatesItem } from '@staff-portal/graphql/staff'

import { getApplicableTalentPool } from './get-applicable-talent-pool'

const mockAggregatedTalentClientHourlyRates: AggregatedTalentClientHourlyRatesItem[] =
  [
    { from: 0, to: 1, count: 0 },
    { from: 1, to: 2, count: 5 },
    { from: 2, to: 3, count: 9 },
    { from: 3, to: 4, count: 15 },
    { from: 4, to: 5, count: 13 },
    { from: 5, to: 6, count: 28 },
    { from: 6, to: 7, count: 20 },
    { from: 7, to: 8, count: 35 },
    { from: 8, to: 9, count: 21 },
    { from: 9, to: 10, count: 8 }
  ]
const mockMaxHourlyRate = 7

// Sum up count up to mockMaxHourlyRate: 0 + 5 + 9 + 15 + 13 + 28 + 20 + 35 = 81
const EXPECTED_NONZERO_VALUE = 81
const EXPECTED_ZERO_VALUE = 0

const fillWithZeros = (arr: AggregatedTalentClientHourlyRatesItem[]) =>
  arr.map(hourlyRate => ({
    ...hourlyRate,
    count: 0
  }))

describe('getApplicableTalentPool', () => {
  it('returns correct value', () => {
    expect(
      getApplicableTalentPool(
        mockAggregatedTalentClientHourlyRates,
        mockMaxHourlyRate
      )
    ).toEqual(EXPECTED_NONZERO_VALUE)
  })

  it('returns 0 if mockAggregatedTalentClientHourlyRates is null or undefined', () => {
    expect(getApplicableTalentPool(null, mockMaxHourlyRate)).toEqual(
      EXPECTED_ZERO_VALUE
    )
    expect(getApplicableTalentPool(undefined, mockMaxHourlyRate)).toEqual(
      EXPECTED_ZERO_VALUE
    )
  })

  it('returns 0 if total talents count is 0', () => {
    const mockAggregatedTalentClientHourlyRatesFilledWithZeros = fillWithZeros(
      mockAggregatedTalentClientHourlyRates
    )

    expect(
      getApplicableTalentPool(
        mockAggregatedTalentClientHourlyRatesFilledWithZeros,
        mockMaxHourlyRate
      )
    ).toEqual(EXPECTED_ZERO_VALUE)
  })
})
