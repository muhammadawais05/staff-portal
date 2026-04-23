import {
  TalentPitchCertificationItemInput,
  TalentPitchEducationItemInput,
  TalentPitchEmploymentItemInput,
  TalentPitchInput,
  TalentPitchMentorshipItemInput,
  TalentPitchPortfolioItemInput,
  TalentPitchPublicationItemInput
} from '@staff-portal/graphql/staff'

import { PitcherHighlights } from '../types'

interface Props {
  highlights: PitcherHighlights
}

export const getBuildTalentPitchInput = ({
  highlights: { skills, industries, items, portfolio }
}: Props): TalentPitchInput => {
  const certificationPitchItems: TalentPitchCertificationItemInput[] = []
  const educationPitchItems: TalentPitchEducationItemInput[] = []
  const employmentPitchItems: TalentPitchEmploymentItemInput[] = []
  const mentorshipPitchItems: TalentPitchMentorshipItemInput[] = []
  const portfolioPitchItems: TalentPitchPortfolioItemInput[] = []
  const publicationPitchItems: TalentPitchPublicationItemInput[] = []

  const skillPitchItems = skills.map((skillSetId, index) => ({
    skillSetId,
    sortPosition: index
  }))

  const industryPitchItems = industries.map((industryId, index) => ({
    industryId,
    sortPosition: skillPitchItems.length + index
  }))

  const itemsStartIndex = skillPitchItems.length + industryPitchItems.length

  items.forEach(({ id, type, description_items }, index) => {
    switch (type) {
      case 'certification':
        certificationPitchItems.push({
          certificationId: id,
          sortPosition: itemsStartIndex + index
        })
        break
      case 'education':
        educationPitchItems.push({
          educationId: id,
          sortPosition: itemsStartIndex + index
        })
        break
      case 'employment':
        employmentPitchItems.push({
          additionalTextItems: description_items ?? [],
          employmentId: id,
          sortPosition: itemsStartIndex + index
        })
        break
      case 'mentorship':
        mentorshipPitchItems.push({ sortPosition: itemsStartIndex + index })
        break
      case 'portfolio':
        portfolioPitchItems.push({
          portfolioItemId: id,
          sortPosition: itemsStartIndex + index
        })
        break
      case 'publication':
        publicationPitchItems.push({
          publicationId: id,
          sortPosition: itemsStartIndex + index
        })
        break
    }
  })

  const portfolioStartIndex = itemsStartIndex + items.length

  const portfolioItems = portfolio.map((portfolioItemId, sortPosition) => ({
    portfolioItemId,
    sortPosition: portfolioStartIndex + sortPosition
  }))

  portfolioPitchItems.push(...portfolioItems)

  return {
    certificationPitchItems,
    educationPitchItems,
    employmentPitchItems,
    industryPitchItems,
    mentorshipPitchItems,
    portfolioPitchItems,
    publicationPitchItems,
    skillPitchItems
  } as TalentPitchInput
}
