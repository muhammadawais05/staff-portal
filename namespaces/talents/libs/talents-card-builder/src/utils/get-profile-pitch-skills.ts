import { TalentPitchFragment } from '../data/talent-pitch-fragment/talent-pitch-fragment.staff.gql.types'
import { TalentProfileFragment } from '../data/talent-profile-fragment/talent-profile-fragment.staff.gql.types'

export const getProfilePitchSkills = (
  talentProfile?: TalentProfileFragment | null,
  pitch?: TalentPitchFragment | null
) => {
  // The profile skillSet ID is different from the pitch skillSet ID,
  // so we need to return the skillSet ID from the talent profile.
  // But we should iterate over sorted pitch skill sets

  // We prepare the dictionary: skill-id => profile-skill-set-id
  const skillIdToProfileSkillSetIdDictionary =
    talentProfile?.profileV2?.skillSets.nodes.reduce<Record<string, string>>(
      (acc, profileSkillSet) => {
        acc[profileSkillSet.skill.id] = profileSkillSet.id

        return acc
      },
      {}
    ) ?? null

  if (!skillIdToProfileSkillSetIdDictionary) {
    return []
  }

  // Then we map pitch skill sets ids to profile skill set ids
  return (
    pitch?.skillItems.nodes.reduce<string[]>((acc, pitchSkillSet) => {
      const foundId =
        skillIdToProfileSkillSetIdDictionary[pitchSkillSet.skillSet.skill.id]

      if (foundId) {
        acc.push(foundId)
      }

      return acc
    }, []) ?? []
  )
}
