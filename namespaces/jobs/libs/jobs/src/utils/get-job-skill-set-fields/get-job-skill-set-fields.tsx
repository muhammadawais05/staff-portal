import React from 'react'
import { SkillRating, Maybe } from '@staff-portal/graphql/staff'
import { DetailedListItem } from '@staff-portal/ui'

import { ReadonlySkillList } from '../../components'

export type SkillSet = {
  id: string
  rating: SkillRating
  main: boolean
  niceToHave: boolean
  connections?: Maybe<{ totalCount: number }>
  skill: {
    id: string
    name: string
    category: { id: string; title: string; position?: Maybe<number> }
  }
}

export type SkillSets = SkillSet[]
type GroupedSkills = Record<string, { position: number; skills: SkillSet[] }>

type FieldSet = DetailedListItem & {
  label: string
  position: number
  highestRating: number
}

export const SkillRankingMap: Record<SkillRating, number> = {
  [SkillRating.EXPERT]: 3,
  [SkillRating.STRONG]: 2,
  [SkillRating.COMPETENT]: 1
}

export const getHighestRating = (skillSets: SkillSets) => {
  return skillSets.reduce((acc, skillSet) => {
    const rating = SkillRankingMap[skillSet.rating]

    return rating > acc ? rating : acc
  }, 1)
}

export const groupSkillSetsByCategory = (skillSets: SkillSets) =>
  skillSets.reduce<GroupedSkills>((acc, skillSet) => {
    const categoryPosition = skillSet.skill.category.position || 0
    const category = skillSet.skill.category.title

    if (!acc[category]) {
      acc[category] = { position: categoryPosition, skills: [skillSet] }
    } else {
      acc[category].skills.push(skillSet)
    }

    return acc
  }, {})

const sortByRatingAndPosition = (itemA: FieldSet, itemB: FieldSet) => {
  if (itemA.highestRating === itemB.highestRating) {
    return itemA.position - itemB.position
  }

  return itemB.highestRating - itemA.highestRating
}

export const generateSkillSetFields = (
  skillSetsByCategory: GroupedSkills
): FieldSet[] =>
  Object.keys(skillSetsByCategory)
    .map(categoryName => ({
      label: categoryName,
      value: (
        <ReadonlySkillList
          skillSets={skillSetsByCategory[categoryName].skills}
        />
      ),
      position: skillSetsByCategory[categoryName].position,
      highestRating: getHighestRating(skillSetsByCategory[categoryName].skills)
    }))
    .sort(sortByRatingAndPosition)

const getJobSkillSetFields = (skillSets: SkillSets = []) => {
  const skillSetsByCategory = groupSkillSetsByCategory(skillSets)

  return generateSkillSetFields(skillSetsByCategory)
}

export default getJobSkillSetFields
