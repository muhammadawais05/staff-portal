export enum SEARCH_TYPES {
  SKILLS,
  EXCLUDED_SKILLS,
  KEYWORDS,
  EXCLUDED_KEYWORDS
}

export type SkillsAutoSuggestOption = {
  text: string
  value?: string
  key?: string
}
