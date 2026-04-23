import { TalentProfileFragment } from '../data/talent-profile-fragment/talent-profile-fragment.staff.gql.types'
import { ProfileContent } from '../types'
import {
  getPortfolioItemGroup,
  PortfolioItemGroup
} from './getPortfolioItemGroup'

export const getTalentCardContent = ({
  profileV2: profile,
  isMentor,
  resumePublications
}: TalentProfileFragment): ProfileContent => {
  const experienceData = profile.portfolioItems.nodes.filter(
    item => getPortfolioItemGroup(item) === PortfolioItemGroup.EXPERIENCE
  )

  const portfolioData = profile.portfolioItems.nodes.filter(
    item => getPortfolioItemGroup(item) === PortfolioItemGroup.DESIGN
  )

  return {
    ...profile,
    certifications: profile.certifications.nodes,
    educations: profile.educations.nodes,
    employments: profile.employments.nodes,
    skills: profile.skillSets.nodes,
    industries: profile.industries.nodes,
    experience: experienceData,
    portfolio: portfolioData,
    publications: resumePublications?.nodes ?? [],
    mentorship: Boolean(isMentor)
  }
}
