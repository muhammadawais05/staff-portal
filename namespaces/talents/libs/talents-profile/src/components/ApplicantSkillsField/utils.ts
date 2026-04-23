import { ApplicantSkillsAutocompleteFragment } from '@staff-portal/talents'
import { Item } from '@toptal/picasso/TagSelector'

import { TalentProfileGeneralDataFragment } from '../TalentGeneralSection/data/get-talent-profile-general-data'

export const prepareApplicantSkills = (
  applicantSkills: TalentProfileGeneralDataFragment['applicantSkills']
): Item[] =>
  applicantSkills?.nodes.map(({ name, id }) => ({
    text: name,
    value: id
  })) || []

export const prepareApplicationSkills = (
  applicationSkills: ApplicantSkillsAutocompleteFragment[] | null
): Item[] =>
  applicationSkills?.map<Item>(({ node }) => ({
    text: node?.name,
    value: node?.id
  })) || []

export const getSkillName = (item: Item | null) => item?.text || ''
