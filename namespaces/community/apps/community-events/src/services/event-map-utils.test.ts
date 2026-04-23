import {
  coordsToString,
  stringToCoords,
  isPositionValid
} from './event-map-utils'

describe('Event location map utils', () => {
  describe('coordsToString', () => {
    it('converts coordinates to string format', () => {
      const coordA = { lat: -42, lng: 13 }
      const coordB = { lat: 54.4531, lng: 18.1473 }
      const coordC = { lat: 12.47, lng: -43.234 }

      const resultA = coordsToString(coordA)
      const resultB = coordsToString(coordB)
      const resultC = coordsToString(coordC)

      expect(resultA).toBe('-42, 13')
      expect(resultB).toBe('54.4531, 18.1473')
      expect(resultC).toBe('12.47, -43.234')
    })
  })

  describe('stringToCoords', () => {
    it('converts string to coordinates format', () => {
      const coordStringA = '-42, 13'
      const coordStringB = '54.4531, 18.1473'
      const coordStringC = '12.47, -43.234'
      const invalidCoordString = ''

      const resultA = stringToCoords(coordStringA)
      const resultB = stringToCoords(coordStringB)
      const resultC = stringToCoords(coordStringC)
      const resultD = stringToCoords(invalidCoordString)

      expect(resultA).toEqual({ lat: -42, lng: 13 })
      expect(resultB).toEqual({ lat: 54.4531, lng: 18.1473 })
      expect(resultC).toEqual({ lat: 12.47, lng: -43.234 })
      expect(resultD).toEqual({ lat: NaN, lng: NaN })
    })
  })

  describe('isPositionValid', () => {
    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation()
    })

    it.each([
      [true, '-42, 13'],
      [true, '54.4531, 18.1473'],
      [true, '12.47, -43.234'],
      [false, '-42, '],
      [false, ', 18.1473'],
      [false, ' , '],
      [false, 'aaaaaaaa'],
      [false, '0'],
      [false, '']
    ])('returns "%s" for coord "%s"', (expected, coord) => {
      const result = isPositionValid(coord)

      expect(result).toBe(expected)
    })
  })
})
