import { getTalentTypeTitle } from './get-talent-type-title'

describe('getTalentTypeTitle', () => {
  describe('when top_screen talent type provided', () => {
    it('returns titleized type with no space', () => {
      expect(getTalentTypeTitle('top_screen')).toBe('TopScreen')
    })
  })

  describe('when other talent types provided', () => {
    it('returns titleized type', () => {
      expect(getTalentTypeTitle('developer')).toBe('Developer')
      expect(getTalentTypeTitle('finance_expert')).toBe('Finance Expert')
    })
  })
})
