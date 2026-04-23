import { isNotNullish } from '@staff-portal/utils'

import {
  PreviewExperiencePublicationType,
  PreviewExperiencePortfolioType,
  PreviewExperienceMentorshipType,
  ProfilePublication,
  ProfileExperience,
  ExperienceSelectionItem
} from '../types'

type Props = {
  stateExperience: ExperienceSelectionItem[]
  contentExperience: ProfileExperience[]
  contentPublications: ProfilePublication[]
}

export const getPreviewExperienceData = ({
  stateExperience,
  contentExperience,
  contentPublications
}: Props) =>
  stateExperience
    .map(item => {
      if (item.type === 'mentorship') {
        const mentorshipItem: PreviewExperienceMentorshipType = {
          id: item.id,
          type: 'mentorship'
        }

        return mentorshipItem
      }

      if (item.type === 'portfolio') {
        const contentPortfolio = contentExperience.find(
          ({ id }) => id === item.id
        )

        if (!contentPortfolio) {
          return null
        }

        const portfolioItem: PreviewExperiencePortfolioType = {
          ...contentPortfolio,
          type: 'portfolio'
        }

        return portfolioItem
      }

      if (item.type === 'publication') {
        const contentPublication = contentPublications.find(
          ({ id }) => id === item.id
        )

        if (!contentPublication) {
          return null
        }

        const publicationItem: PreviewExperiencePublicationType = {
          ...contentPublication,
          type: 'publication'
        }

        return publicationItem
      }

      return null
    })
    .filter(isNotNullish)
