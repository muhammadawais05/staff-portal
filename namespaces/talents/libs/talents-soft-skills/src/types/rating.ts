import { TalentSoftSkillsFragment } from '../data/get-talent-soft-skills/get-talent-soft-skills.staff.gql.types'

export type Rating = NonNullable<
  TalentSoftSkillsFragment['softSkillRatings']
>['nodes'][0]
