import { SkillConnectionType } from '../../types'

export type Section = {
  name: string
  descriptions: string[]
  amount: number
  type: SkillConnectionType
}
