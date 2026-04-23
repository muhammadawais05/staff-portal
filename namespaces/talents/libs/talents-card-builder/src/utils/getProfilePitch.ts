import { TalentPitchFragment } from '../data/talent-pitch-fragment/talent-pitch-fragment.staff.gql.types'
import { TalentProfileFragment } from '../data/talent-profile-fragment/talent-profile-fragment.staff.gql.types'
import { PitcherHighlights } from '../types'
import { getProfilePitchSkills } from './get-profile-pitch-skills'
import { parsePitchHighlights } from './parse-pitch-highlights'
import { getProfilePitchIndustries } from './get-profile-pitch-industries'

/**
 * Transform a Typed Pitch Data into a format used by the application form.
 */
export const getProfilePitch = (
  talentProfile?: TalentProfileFragment | null,
  pitch?: TalentPitchFragment | null
): PitcherHighlights | null => {
  const skills = getProfilePitchSkills(talentProfile, pitch)
  const industries: string[] = getProfilePitchIndustries(pitch)
  const portfolio: string[] =
    pitch?.designPortfolioItems.nodes.map(item => item.portfolioItem.id) ?? []

  const items = parsePitchHighlights({ pitch, portfolio })

  return {
    skills,
    industries,
    items,
    portfolio
  }
}
