import { ProfileItemFragment } from '../../../data'
import { TalentIndustryTypename } from '../config'

export const generateSectionDescription = (node: ProfileItemFragment) => {
  switch (node.__typename) {
    case TalentIndustryTypename.PORTFOLIO_ITEM:
      return node.title
    case TalentIndustryTypename.EMPLOYMENT: {
      const period = `${node.startDate} - ${
        node.endDate ? node.endDate : 'Present'
      }`

      return `${node.position}, ${node.company} · ${period}`
    }
    default:
      return ''
  }
}
