import { EditSkillNameForm } from '../../types'

export const toUpdateSkillNameInput = (
  values: EditSkillNameForm,
  afterMergeConfirmation: boolean
) => {
  const { skillNameId, newName, skillPageSlug, skills: formSkills } = values
  const skills = formSkills.map(
    ({ id, categoryId, parentSkillId, isIdentifier }) => {
      return { id, categoryId, parentSkillId, isIdentifier }
    }
  )

  return { skillNameId, newName, skillPageSlug, afterMergeConfirmation, skills }
}
