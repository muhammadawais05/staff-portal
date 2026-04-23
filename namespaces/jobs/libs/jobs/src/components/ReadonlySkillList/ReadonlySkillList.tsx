import React, { useMemo } from 'react'
import { Tag } from '@toptal/picasso'
import { SkillRating } from '@staff-portal/graphql/staff'

import { JobSkillSetFragment } from '../../data'
import { JobSkillTag } from '../index'

export interface Props {
  skillSets: JobSkillSetFragment[] | undefined
}
export const SkillRankingMap: Record<SkillRating, number> = {
  [SkillRating.EXPERT]: 3,
  [SkillRating.STRONG]: 2,
  [SkillRating.COMPETENT]: 1
}

const sortSkills = (
  skillA: JobSkillSetFragment,
  skillB: JobSkillSetFragment
) => {
  if (skillA.niceToHave === skillB.niceToHave) {
    return SkillRankingMap[skillB.rating] - SkillRankingMap[skillA.rating]
  }

  return skillA.niceToHave ? 1 : -1
}

const ReadonlySkillList = ({ skillSets }: Props) => {
  const sortedSkillSets = useMemo(
    () => skillSets && [...skillSets].sort(sortSkills),
    [skillSets]
  )

  return (
    <Tag.Group data-testid='skill-list'>
      {sortedSkillSets?.map(skillSet => (
        <JobSkillTag key={skillSet.id} skillSet={skillSet} />
      ))}
    </Tag.Group>
  )
}

export default ReadonlySkillList
