import { TalentSkillSetConnectionsFragment } from '../../../../../data/talent-skill-set-connections-fragment'
import { SkillConnectionType } from '../../../types'
import { SECTIONS_ORDER } from '../config'
import { generateSectionDescription } from './generate-section-description'
import { generateSectionName } from './generate-section-name'
import { Section } from '../types'

const sortSectionsByType = (
  { type: sectionType1 }: Section,
  { type: sectionType2 }: Section
) => {
  const index1 = SECTIONS_ORDER.indexOf(sectionType1)
  const index2 = SECTIONS_ORDER.indexOf(sectionType2)

  return index1 - index2
}

export const generateSkillConnectionsSections = (
  talentType: string,
  skillSet: TalentSkillSetConnectionsFragment
) => {
  const sections = {} as Record<SkillConnectionType, string[]>

  skillSet.connections?.nodes.forEach(connection => {
    const type = connection.__typename

    if (!sections[type]) {
      sections[type] = []
    }
    sections[type].push(generateSectionDescription(connection))
  })

  return Object.entries(sections)
    .map(([sectionType, descriptions]) => ({
      name: generateSectionName(sectionType as SkillConnectionType, talentType),
      descriptions,
      amount: descriptions.length,
      type: sectionType as SkillConnectionType
    }))
    .sort(sortSectionsByType) as Section[]
}
