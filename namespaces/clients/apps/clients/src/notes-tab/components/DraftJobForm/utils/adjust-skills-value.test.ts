import { adjustSkillsValue } from './adjust-skills-value'

describe('#adjustSkillsValue', () => {
  describe('when data is empty', () => {
    it('should return null', () => {
      expect(adjustSkillsValue([])).toBeNull()
    })
  })

  describe('when data is not empty', () => {
    it('should return array of strings', () => {
      expect(
        adjustSkillsValue([
          { value: '123', text: 'text1' },
          { value: '123', text: 'text2' }
        ])
      ).toEqual(['text1', 'text2'])
    })
  })
})
