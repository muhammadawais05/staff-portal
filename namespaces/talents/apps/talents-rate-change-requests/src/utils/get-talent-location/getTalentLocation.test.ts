import { createTalentForRateChangeRequestMock } from '../../data/rate-change-request-fragment/mocks'
import { getTalentLocation } from './getTalentLocation'

describe('getTalentLocation', () => {
  it('return talent city and country', () => {
    const talent = createTalentForRateChangeRequestMock({
      locationV2: {
        countryName: 'Spain',
        cityName: 'Barcelona'
      }
    })

    expect(getTalentLocation(talent)).toBe('Barcelona, Spain')
  })

  describe('when there is no city', () => {
    it('return talent country', () => {
      const talent = createTalentForRateChangeRequestMock({
        locationV2: {
          countryName: 'Spain',
          cityName: null
        }
      })

      expect(getTalentLocation(talent)).toBe('Spain')
    })
  })

  describe('when there is no country', () => {
    it('return talent city', () => {
      const talent = createTalentForRateChangeRequestMock({
        locationV2: {
          countryName: null,
          cityName: 'Barcelona'
        }
      })

      expect(getTalentLocation(talent)).toBe('Barcelona')
    })
  })

  describe('when there is no location', () => {
    it('return null', () => {
      const talent = createTalentForRateChangeRequestMock({
        locationV2: null
      })

      expect(getTalentLocation(talent)).toBeNull()
    })
  })
})
