import { SkillConnection } from '../../../types'
import { TalentSkillTypename } from '../config'

export const generateSectionDescription = (node: SkillConnection) => {
  switch (node.__typename) {
    case TalentSkillTypename.TALENT_EDUCATION:
      return `${node.degree} — ${node.title}"`
    case TalentSkillTypename.TALENT_PORTFOLIO_ITEM:
      return node.title
    case TalentSkillTypename.TALENT_CERTIFICATION:
      return `${node.certificate}, ${node.institution}`
    case TalentSkillTypename.TALENT_EMPLOYMENT: {
      const period = `${node.startYear} - ${
        node.endYear ? node.endYear : 'Present'
      }`

      return `${node.position}, ${node.company} · ${period}`
    }
    default:
      return ''
  }
}
