export type ExperienceSelectionItem = {
  id: string
  type: 'mentorship' | 'portfolio' | 'publication'
}

export type HighlightItem = {
  id: string
  type: HighlightType
  description_items?: string[]
}

export type HighlightType =
  | 'certification'
  | 'education'
  | 'employment'
  | 'mentorship'
  | 'portfolio'
  | 'publication'

export interface PitcherHighlights {
  skills: string[]
  industries: string[]
  items: HighlightItem[]
  portfolio: string[]
}

export interface PitcherState {
  highlights: PitcherHighlights
}
