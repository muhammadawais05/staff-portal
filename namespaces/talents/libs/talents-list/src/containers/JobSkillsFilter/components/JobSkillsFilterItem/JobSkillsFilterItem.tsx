import React, { useCallback, useMemo } from 'react'
import {
  Checkbox,
  Container,
  ArrowLongRight16,
  TypographyOverflow
} from '@toptal/picasso'
import {
  ApplicantSkillRating,
  SkillBadgedSearchInput,
  ApplicantSkillBadgedSearchInput,
  SkillRating
} from '@staff-portal/graphql/staff'

import * as S from './styles'
import { TalentsListJobSkillFragment } from '../../../../data'

export interface Props {
  skillSet: TalentsListJobSkillFragment
  onSkillSelect: (skill: SkillBadgedSearchInput | ApplicantSkillBadgedSearchInput) => void
  onSkillDeselect: (skillName: string) => void
  selectedSkills: SkillBadgedSearchInput[]
  ratingOverride?: ApplicantSkillRating
}

export const JobSkillsFilterItem = ({
  skillSet,
  selectedSkills,
  onSkillSelect,
  onSkillDeselect,
  ratingOverride
}: Props) => {
  const skillContainer = useMemo(
    () =>
      ratingOverride
        ? [S.skill, S.competentSkill]
        : [
            S.skill,
            skillSet.rating === SkillRating.COMPETENT && S.competentSkill,
            skillSet.rating === SkillRating.STRONG && S.strongSkill,
            skillSet.rating === SkillRating.EXPERT && S.expertSkill
          ],
    [ratingOverride, skillSet]
  )

  const isChecked = useMemo(
    () =>
      Boolean(selectedSkills.find(({ name }) => name === skillSet.skill.name)),
    [selectedSkills, skillSet]
  )

  const toggleSkill = useCallback(
    () =>
      isChecked
        ? onSkillDeselect(skillSet.skill.name)
        : onSkillSelect({
            name: skillSet.skill.name,
            rating: ratingOverride || skillSet.rating
          }),
    [isChecked, onSkillDeselect, onSkillSelect, skillSet, ratingOverride]
  )

  return (
    <Container
      flex
      alignItems='center'
      inline
      bottom='xsmall'
      right='xsmall'
      css={skillContainer}
      onClick={toggleSkill}
      data-testid='job-skills-filter-item'
    >
      {skillSet.main && (
        <Container inline flex right='xsmall'>
          <ArrowLongRight16 data-testid='main-skill-icon' />
        </Container>
      )}
      <Container inline flex right='xsmall'>
        <Checkbox
          data-testid='skill-checkbox'
          checked={isChecked}
          onChange={() => {}}
        />
      </Container>
      <Container>
        <TypographyOverflow
          size='xsmall'
          weight='semibold'
          color='inherit'
          data-testid='label'
        >
          {skillSet.skill.name}
        </TypographyOverflow>
      </Container>
    </Container>
  )
}

export default JobSkillsFilterItem
