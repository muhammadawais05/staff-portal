export interface Question {
  id?: string
  destroy?: boolean
  jobPositionQuestionTemplateId?: string
  label: string
  required: boolean
  comment?: string | null
  sticky?: boolean
}
