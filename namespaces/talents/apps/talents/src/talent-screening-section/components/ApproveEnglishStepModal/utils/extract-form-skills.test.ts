import { extractFormSkills } from './extract-form-skills'

describe('extractFormSkills', () => {
  describe('when passing an empty array', () => {
    it('returns empty arrays', () => {
      expect(extractFormSkills([])).toStrictEqual({ ids: [], names: [] })
    })
  })

  describe('passing only strings', () => {
    it('returns empty ids list', () => {
      expect(extractFormSkills(['abc'])).toStrictEqual({
        ids: [],
        names: ['abc']
      })
    })
  })

  describe('passing only skills objects', () => {
    it('returns both ids and names', () => {
      expect(extractFormSkills([{ id: '1', name: 'abc' }])).toStrictEqual({
        ids: ['1'],
        names: ['abc']
      })
    })
  })

  describe('passing both string and skill object', () => {
    it('returns both ids and names', () => {
      expect(
        extractFormSkills([{ id: '1', name: 'abc' }, 'test'])
      ).toStrictEqual({
        ids: ['1'],
        names: ['abc', 'test']
      })
    })
  })
})
