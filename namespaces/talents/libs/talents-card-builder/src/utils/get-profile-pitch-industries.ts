import { TalentPitchFragment } from '../data/talent-pitch-fragment/talent-pitch-fragment.staff.gql.types'

export const getProfilePitchIndustries = (
  pitch?: TalentPitchFragment | null
) => {
  return (pitch?.industryItems?.nodes ?? []).map(item => item.industry.id)
}
