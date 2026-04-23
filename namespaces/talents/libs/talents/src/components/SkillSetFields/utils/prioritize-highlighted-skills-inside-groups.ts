import { SkillRating } from '@staff-portal/graphql/staff'

import type { SkillSets } from '../types'

export default (skillSets: SkillSets, highlightedSkillIds: string[]) => {
  if (!highlightedSkillIds.length) {
    return skillSets
  }

  // group by rating
  const groupedSkills = skillSets.reduce((grouped, skill) => {
    if (grouped[skill.rating]) {
      grouped[skill.rating].push(skill)
    } else {
      grouped[skill.rating] = [skill]
    }

    return grouped
  }, {} as Record<SkillRating, SkillSets>)

  // prioritize highlighed skills inside groups
  return Object.values(groupedSkills).reduce((prioritizedSkills, skills) => {
    const [highlightedSkills, nonHighlightedSkills] = skills.reduce(
      (pairs, skillSet) => {
        const [highlighted, nonHighlighted] = pairs

        if (highlightedSkillIds.includes(skillSet.skill.id)) {
          highlighted.push(skillSet)
        } else {
          nonHighlighted.push(skillSet)
        }

        return pairs
      },
      [[], []] as [SkillSets, SkillSets]
    )

    prioritizedSkills.push(...highlightedSkills, ...nonHighlightedSkills)

    return prioritizedSkills
  }, [] as SkillSets)
}
