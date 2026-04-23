import { getPrimaryContactId } from './get-primary-contact-id'

describe('getPrimaryContactId', () => {
  describe('when contacts and interview contacts are empty', () => {
    it('returns undefined', () => {
      expect(getPrimaryContactId([], { edges: [] })).toBeUndefined()
    })
  })

  describe("when contacts is empty and interview contacts doesn't have main contact", () => {
    it('returns undefined', () => {
      expect(
        getPrimaryContactId([], {
          edges: [
            {
              main: false,
              node: {
                id: '1',
                fullName: 'Contact 1',
                webResource: { text: 'Contact 1' }
              }
            }
          ]
        })
      ).toBeUndefined()
    })
  })

  describe("when interview contacts doesn't have main contact", () => {
    it('returns first available contact', () => {
      expect(
        getPrimaryContactId(['12', '13'], {
          edges: [
            {
              main: false,
              node: {
                id: '1',
                fullName: 'Contact 1',
                webResource: { text: 'Contact 1' }
              }
            }
          ]
        })
      ).toBe('12')
    })
  })

  describe('when interview contacts have main contact', () => {
    it('returns first available contact', () => {
      expect(
        getPrimaryContactId(['12', '13'], {
          edges: [
            {
              main: true,
              node: {
                id: '1',
                fullName: 'Contact 1',
                webResource: { text: 'Contact 1' }
              }
            }
          ]
        })
      ).toBe('1')
    })
  })
})
