export interface SkillForm {
  id?: string
  categoryId: string
  verticalId: string
  isIdentifier?: boolean | null
  isIdentifierUnmarkable?: boolean | null
  parentSkillId?: string
}

export interface EditSkillNameForm {
  skillNameId: string
  newName: string
  skillPageSlug?: string | null
  afterMergeConfirmation?: boolean
  skills: SkillForm[]
}
