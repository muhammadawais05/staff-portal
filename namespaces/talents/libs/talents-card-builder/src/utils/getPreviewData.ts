import { isNotNullish } from '@staff-portal/utils'

import {
  PitcherState,
  PreviewHighlightType,
  PreviewProfileContent,
  ProfileContent
} from '../types'

interface GetPreviewDataParams {
  content: ProfileContent
  state: PitcherState
}

export const getPreviewData = ({
  content,
  state
}: GetPreviewDataParams): PreviewProfileContent => {
  const highlights: PreviewHighlightType[] = []

  state.highlights.items.forEach(
    // eslint-disable-next-line max-statements, complexity
    ({ id: highlightId, type, description_items }) => {
      switch (type) {
        case 'certification': {
          const item = content.certifications.find(
            ({ id: itemId }) => highlightId === itemId
          )

          if (item) {
            highlights.push({ type, ...item })
          }

          break
        }
        case 'education': {
          const item = content.educations.find(
            ({ id: itemId }) => highlightId === itemId
          )

          if (item) {
            highlights.push({ type, ...item })
          }

          break
        }
        case 'employment': {
          const item = content.employments.find(
            ({ id: itemId }) => highlightId === itemId
          )

          if (item) {
            highlights.push({
              type,
              ...item,
              experienceItems: description_items ?? []
            })
          }

          break
        }
        case 'mentorship': {
          highlights.push({ type, id: highlightId })
          break
        }
        case 'portfolio': {
          const item = content.experience.find(
            ({ id: itemId }) => highlightId === itemId
          )

          if (item) {
            highlights.push({ type, ...item })
          }

          break
        }
        case 'publication': {
          const item = content.publications.find(
            ({ id: itemId }) => highlightId === itemId
          )

          if (item) {
            highlights.push({ type, ...item })
          }

          break
        }
      }
    }
  )

  return {
    skills: state.highlights.skills
      .map(item => content.skills.find(({ id }) => id === item))
      .filter(isNotNullish),
    industries: state.highlights.industries
      .map(item =>
        content.industries.find(({ industry }) => industry.id === item)
      )
      .filter(isNotNullish),
    portfolio: state.highlights.portfolio
      .map(item => content.portfolio.find(({ id }) => id === item))
      .filter(isNotNullish),
    highlights
  }
}
