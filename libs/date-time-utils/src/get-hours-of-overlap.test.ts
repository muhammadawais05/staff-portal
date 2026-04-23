import { getHoursOfOverlap } from './get-hours-of-overlap'

describe('#getHoursOfOverlap', () => {
  describe('when the max hours of overlap is 5', () => {
    it('returns the correct options with 5 hours max overlap', () => {
      expect(getHoursOfOverlap({ maxHoursOverlap: 5 })).toEqual([
        { text: 'No preference', value: 'no_preference' },
        { text: '1 hour', value: 'HOUR_1' },
        { text: '2 hours', value: 'HOUR_2' },
        { text: '3 hours', value: 'HOUR_3' },
        { text: '4 hours', value: 'HOUR_4' },
        { text: '5 hours', value: 'HOUR_5' }
      ])
    })
  })

  describe('with custom valueGetter', () => {
    it('returns the option with correctly generated value', () => {
      const valueGetter = (value: number | null | undefined) =>
        value === null || value === undefined ? '' : `value: ${value}`

      expect(getHoursOfOverlap({ maxHoursOverlap: 1, valueGetter })).toEqual([
        { text: 'No preference', value: '' },
        { text: '1 hour', value: 'value: 1' }
      ])
    })
  })
})
