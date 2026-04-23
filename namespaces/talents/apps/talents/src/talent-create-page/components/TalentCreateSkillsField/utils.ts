import { ApplicantSkillsAutocompleteFragment } from '@staff-portal/talents'
import { Item } from '@toptal/picasso/TagSelector'

import { TalentTypes } from '../../constants'

export const isSkillLabel = (talentType: string) =>
  talentType === TalentTypes.DEVELOPER ||
  talentType === TalentTypes.DESIGNER ||
  talentType === TalentTypes.TOP_SCREEN

export const prepareApplicationSkills = (
  applicationSkills: ApplicantSkillsAutocompleteFragment[] | null
): Item[] =>
  applicationSkills?.map<Item>(({ node }) => ({
    text: node?.name,
    value: node?.id
  })) || []
