import { TIMEZONE_FILTER_MAX, TIMEZONE_FILTER_MIN } from '@staff-portal/config'

import { TimeZoneRangeGqlParam } from './timezone-range-gql-param'

describe('TimeZoneRangeGqlParam', () => {
  describe('when at least one value is provided', () => {
    it.each([
      [
        { from: 1, to: 2 },
        { from: '1', to: '2' }
      ],
      [
        { from: 1, to: undefined },
        {
          from: '1',
          to: TIMEZONE_FILTER_MAX.toString()
        }
      ],
      [
        { from: undefined, to: 2 },
        {
          from: TIMEZONE_FILTER_MIN.toString(),
          to: '2'
        }
      ]
    ])('%s', (values, expected) => {
      const result = TimeZoneRangeGqlParam()(values)

      expect(result).toMatchObject(expected)
    })
  })

  describe('when no value is provided', () => {
    it.each([
      [{ from: undefined, to: undefined }, undefined],
      [{ from: null, to: null }, undefined]
    ])('%s', (values, expected) => {
      const result = TimeZoneRangeGqlParam()(values)

      expect(result).toBe(expected)
    })
  })
})
