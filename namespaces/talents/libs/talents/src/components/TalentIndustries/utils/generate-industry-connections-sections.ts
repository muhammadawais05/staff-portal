import { ProfileItemFragment } from '../../../data'
import { IndustryConnectionType, Section } from '../types'
import { SECTIONS_ORDER, TalentIndustryTypename } from '../config'
import { generateSectionDescription } from './generate-section-description'
import { generateSectionName } from './generate-section-name'

const sortSectionsByType = (
  { type: sectionType1 }: Section,
  { type: sectionType2 }: Section
) => {
  const index1 = SECTIONS_ORDER.indexOf(sectionType1)
  const index2 = SECTIONS_ORDER.indexOf(sectionType2)

  return index1 - index2
}

export const generateIndustryConnectionsSections = (
  profileItems: ProfileItemFragment[]
) => {
  const sections = profileItems.reduce((acc, item) => {
    const type = item.__typename

    if (!acc[type]) {
      acc[type] = []
    }

    acc[type].push(generateSectionDescription(item))

    return acc
  }, {} as Record<IndustryConnectionType, string[]>)

  return Object.entries(sections)
    .map(([sectionType, descriptions]) => ({
      name: generateSectionName(sectionType as TalentIndustryTypename),
      descriptions,
      amount: descriptions.length,
      type: sectionType as IndustryConnectionType
    }))
    .sort(sortSectionsByType) as Section[]
}
