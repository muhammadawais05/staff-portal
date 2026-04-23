import React from 'react'
import { Checkbox, Container, TypographyOverflow } from '@toptal/picasso'
import {
  SkillBadgedSearchInput,
  SkillRating
} from '@staff-portal/graphql/staff'

import * as S from './styles'

export interface Props {
  checked: boolean
  skill: string
  rating: SkillRating
  onSkillSelect: (skill: SkillBadgedSearchInput) => void
  onSkillDeselect: (skillName: string) => void
}

const SkillsFilterItem = ({
  checked,
  skill,
  rating,
  onSkillSelect,
  onSkillDeselect
}: Props) => {
  const skillContainer = [
    S.skill,
    rating === SkillRating.COMPETENT && S.competentSkill,
    rating === SkillRating.STRONG && S.strongSkill,
    rating === SkillRating.EXPERT && S.expertSkill
  ]

  const toggleSkill = () =>
    checked
      ? onSkillDeselect(skill)
      : onSkillSelect({
          name: skill,
          rating: rating
        })

  return (
    <Container
      flex
      alignItems='center'
      inline
      bottom='xsmall'
      right='xsmall'
      css={skillContainer}
      onClick={toggleSkill}
      data-testid='skills-filter-item'
    >
      <Container inline flex right='xsmall'>
        <Checkbox data-testid='skill-checkbox' checked={checked} />
      </Container>
      <Container>
        <TypographyOverflow
          size='xsmall'
          weight='semibold'
          color='inherit'
          data-testid='label'
        >
          {skill}
        </TypographyOverflow>
      </Container>
    </Container>
  )
}

export default SkillsFilterItem
