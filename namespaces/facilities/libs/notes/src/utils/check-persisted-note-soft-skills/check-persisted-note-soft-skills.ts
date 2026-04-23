import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { NoteFormSoftSkill } from '../../types'

export const checkPersistedNoteSoftSkills = ({
  persistedSoftSkills,
  softSkills
}: {
  persistedSoftSkills?: NoteFormSoftSkill[]
  softSkills?: NoteSoftSkillFragment[]
}) => {
  if ((persistedSoftSkills ?? []).length !== (softSkills ?? []).length) {
    return false
  }

  let isValid = true

  persistedSoftSkills?.forEach((value, index) => {
    const softSkill = softSkills?.[index]

    if (!softSkill || value?.softSkill?.id !== softSkill.id) {
      isValid = false

      return
    }
  })

  return isValid
}
