import { Item } from '@toptal/picasso/TagSelector'

export const parseApplicantSkills = (selectedSkills: Item[]) =>
  selectedSkills
    .filter(skill => skill.value !== skill.text)
    .map(skill => skill.value) as string[]

export const parseNewApplicantSkillNames = (selectedSkills: Item[]) =>
  selectedSkills
    .filter(skill => skill.value === skill.text)
    .map(skill => skill.value) as string[]
