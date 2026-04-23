import { NO_VALUE } from '@staff-portal/config'

import { getLocation } from './get-location'

describe('getLocation', () => {
  describe('when location is not passed', () => {
    it('returns placeholder', () => {
      expect(getLocation(null)).toEqual(NO_VALUE)
    })
  })

  describe('when city and country are passed', () => {
    it('returns formatted string', () => {
      expect(
        getLocation({
          cityName: 'Wroclaw',
          countryName: 'Poland'
        })
      ).toBe('Wroclaw, Poland')
    })
  })

  describe('when country is missing', () => {
    it('returns city', () => {
      expect(
        getLocation({
          cityName: 'Wroclaw'
        })
      ).toBe('Wroclaw')
    })
  })

  describe('when city is missing', () => {
    it('returns country', () => {
      expect(
        getLocation({
          countryName: 'Poland'
        })
      ).toBe('Poland')
    })
  })

  describe('when both city and country are missing', () => {
    it('returns placeholder', () => {
      expect(getLocation({})).toEqual(NO_VALUE)
    })
  })
})
