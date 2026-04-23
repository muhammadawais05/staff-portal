import { TalentPitchFragment } from '../data/talent-pitch-fragment/talent-pitch-fragment.staff.gql.types'
import { HighlightItem } from '../types'

export const parsePitchHighlights = ({
  pitch,
  portfolio
}: {
  pitch?: TalentPitchFragment | null
  portfolio: string[]
}): HighlightItem[] => {
  const highlights: HighlightItem[] = []

  pitch?.highlights.nodes.forEach(highlight => {
    if ('certification' in highlight) {
      highlights.push({
        id: highlight.certification?.id as string,
        type: 'certification'
      })
    } else if ('education' in highlight) {
      highlights.push({
        id: highlight.education?.id as string,
        type: 'education'
      })
    } else if (
      'employment' in highlight &&
      highlight.additionalText.length > 0
    ) {
      highlights.push({
        id: highlight.employment?.id as string,
        type: 'employment',
        description_items: highlight.additionalText
      })
    } else if (
      'portfolioItem' in highlight &&
      highlight.portfolioItem?.id &&
      !portfolio.includes(highlight.portfolioItem.id)
    ) {
      highlights.push({
        id: highlight.portfolioItem.id as string,
        type: 'portfolio'
      })
    } else if ('mentorApplication' in highlight) {
      highlights.push({
        id: highlight.mentorApplication?.id as string,
        type: 'mentorship'
      })
    } else if ('publication' in highlight) {
      highlights.push({
        id: highlight.publication?.id as string,
        type: 'publication' as const
      })
    }
  })

  return highlights
}
