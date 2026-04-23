import { ProfileCertification } from './ProfileCertification'
import { ProfileEducation } from './ProfileEducation'
import { ProfileEmployment } from './ProfileEmployment'
import { ProfileExperience } from './ProfileExperience'
import { ProfilePortfolioItem } from './ProfilePortfolioItem'
import { ProfilePublication } from './ProfilePublication'
import { ProfileSkill } from './ProfileSkill'
import { TalentIndustry } from './TalentIndustry'

export interface ProfileContent {
  skills: ProfileSkill[]
  industries: TalentIndustry[]
  certifications: ProfileCertification[]
  educations: ProfileEducation[]
  employments: ProfileEmployment[]
  experience: ProfileExperience[]
  portfolio: ProfilePortfolioItem[]
  publications: ProfilePublication[]
  mentorship: boolean
}

export type PreviewCertificationType = {
  type: 'certification'
} & ProfileCertification
export type PreviewEducationType = {
  type: 'education'
} & ProfileEducation
export type PreviewEmploymentType = {
  type: 'employment'
} & ProfileEmployment
export type PreviewExperiencePortfolioType = {
  type: 'portfolio'
} & ProfileExperience
export type PreviewExperiencePublicationType = {
  type: 'publication'
} & ProfilePublication
export type PreviewExperienceMentorshipType = {
  type: 'mentorship'
} & { id: string }

export type PreviewHighlightType =
  | PreviewCertificationType
  | PreviewEducationType
  | PreviewEmploymentType
  | PreviewExperiencePortfolioType
  | PreviewExperiencePublicationType
  | PreviewExperienceMentorshipType

export type PreviewProfileContent = Pick<
  ProfileContent,
  'skills' | 'industries' | 'portfolio'
> & {
  highlights: PreviewHighlightType[]
}
