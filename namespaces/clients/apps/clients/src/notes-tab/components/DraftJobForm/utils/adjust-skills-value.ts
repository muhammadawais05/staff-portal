import { DraftJobFormFields } from '../../../enums/DraftJobFormFields'
import { BaseDraftJobFormType } from '../../../types'

export const adjustSkillsValue = (
  skills: BaseDraftJobFormType[DraftJobFormFields.Skills]
): string[] | null => {
  if (!skills || !skills.length) {
    return null
  }

  return skills.map(skill => skill.text ?? '')
}
