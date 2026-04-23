import { ProfileItemFragment } from '../../data'

export type IndustryConnectionType = ProfileItemFragment['__typename']

export type Section = {
  name: string
  descriptions: string[]
  amount: number
  type: IndustryConnectionType
}
