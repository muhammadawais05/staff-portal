import { ApplicantSkillsAutocompleteFragment } from '../../data/get-talent-applicant-skills-autocomplete'

export type AutocompleteItem = ApplicantSkillsAutocompleteFragment['node']
export type Skill = AutocompleteItem | string
