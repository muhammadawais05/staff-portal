import { adjustLocation } from '.'

describe('adjustLocation', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ location: { city: 'San Juan' } }, { location: { city: 'San Juan' } }],
      [{ location: { city: '' } }, { location: { city: '' } }],
      [{ location: { city: null } }, { location: { city: '' } }],
      [{ location: { city: undefined } }, { location: { city: '' } }]
    ])('%s', (input, expected) => {
      expect(adjustLocation(input)).toMatchObject(expected)
    })
  })
})
