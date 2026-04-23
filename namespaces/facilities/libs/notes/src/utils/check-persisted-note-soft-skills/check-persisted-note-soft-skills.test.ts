import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { NoteFormSoftSkill } from '../../types'
import { checkPersistedNoteSoftSkills } from './check-persisted-note-soft-skills'

describe('checkPersistedNoteSoftSkills', () => {
  describe('when passing empty arrays', () => {
    it('returns true', () => {
      expect(checkPersistedNoteSoftSkills({})).toBeTruthy()

      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [],
          persistedSoftSkills: []
        })
      ).toBeTruthy()

      expect(
        checkPersistedNoteSoftSkills({
          persistedSoftSkills: []
        })
      ).toBeTruthy()

      expect(
        checkPersistedNoteSoftSkills({
          softSkills: []
        })
      ).toBeTruthy()
    })
  })

  describe('when passing arrays with different length', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [],
          persistedSoftSkills: [{} as NoteFormSoftSkill]
        })
      ).toBeFalsy()

      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [{} as NoteSoftSkillFragment],
          persistedSoftSkills: []
        })
      ).toBeFalsy()

      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [
            {} as NoteSoftSkillFragment,
            {} as NoteSoftSkillFragment
          ],
          persistedSoftSkills: [{} as NoteFormSoftSkill]
        })
      ).toBeFalsy()
    })
  })

  describe('when soft skill is missing', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [{ id: '1' } as NoteSoftSkillFragment],
          persistedSoftSkills: [{} as NoteFormSoftSkill]
        })
      ).toBeFalsy()
    })
  })

  describe('when soft skill IDs are not matching', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [{ id: '1' } as NoteSoftSkillFragment],
          persistedSoftSkills: [{ softSkill: { id: '2' } } as NoteFormSoftSkill]
        })
      ).toBeFalsy()
    })
  })

  describe('when all fields are matching', () => {
    it('returns true', () => {
      expect(
        checkPersistedNoteSoftSkills({
          softSkills: [{ id: '1' } as NoteSoftSkillFragment],
          persistedSoftSkills: [{ softSkill: { id: '1' } } as NoteFormSoftSkill]
        })
      ).toBeTruthy()
    })
  })
})
