import {
  Button,
  Checkbox,
  CloseMinor16,
  Container,
  Select,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import React, { useMemo } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

import { JobSkillSet } from '../../types'
import RequiredSkillCheckbox from '../RequiredSkillCheckbox'
import * as S from './styles'
import { getJobSkillRatingCount } from '../../utils'

const RATING_OPTIONS = [
  SkillRating.COMPETENT,
  SkillRating.STRONG,
  SkillRating.EXPERT
].map(option => ({
  text: titleize(option),
  value: option
}))

export interface Props {
  skillSet: JobSkillSet
  showCheckbox?: boolean
  onMainSkillChange: (skillName: string) => void
  onSkillRatingChange: (skillName: string, value: SkillRating) => void
  onDelete: (skillName: string) => void
  onSkillRequiredChange: (skillName: string) => void
  shouldRenderRatingCount?: boolean
}

const SkillListItem = ({
  skillSet,
  showCheckbox = false,
  onMainSkillChange,
  onSkillRatingChange,
  onDelete,
  onSkillRequiredChange,
  shouldRenderRatingCount = true
}: Props) => {
  const {
    main,
    rating,
    niceToHave,
    skill: { name }
  } = skillSet

  const label = useMemo(
    () => (
      <TypographyOverflow
        size='xsmall'
        weight='semibold'
        color='inherit'
        data-testid='label'
      >
        {name}{' '}
        {shouldRenderRatingCount && <>({getJobSkillRatingCount(skillSet)})</>}
      </TypographyOverflow>
    ),
    [name, skillSet, shouldRenderRatingCount]
  )

  const skillContainer = [
    S.skillContent,
    rating === SkillRating.STRONG && S.strongSkill,
    rating === SkillRating.EXPERT && S.expertSkill
  ]

  return (
    <Container
      right='xsmall'
      bottom='xsmall'
      css={skillContainer}
      flex
      inline
      alignItems='center'
      data-testid='skill-list-item'
    >
      {showCheckbox && (
        <Container inline flex right='xsmall'>
          <Tooltip content='Pick as a main skill'>
            <Checkbox
              data-testid='main-skill-checkbox'
              checked={main}
              onChange={() => onMainSkillChange(name)}
            />
          </Tooltip>
        </Container>
      )}

      <Container inline flex right='xsmall'>
        <RequiredSkillCheckbox
          checked={!niceToHave}
          onClick={() => onSkillRequiredChange(name)}
        />
      </Container>

      <Container right='xsmall' css={S.skillLabelWrapper}>
        {label}
      </Container>

      <Container right='xsmall'>
        <Select
          css={S.ratingSelect}
          menuWidth='8rem'
          size='small'
          value={rating}
          options={RATING_OPTIONS}
          onChange={({ target: { value } }) => onSkillRatingChange(name, value)}
        />
      </Container>
      <Button.Circular
        css={S.deleteButton}
        data-testid='delete-button'
        variant='transparent'
        icon={<CloseMinor16 color='white' />}
        onClick={() => onDelete(name)}
      />
    </Container>
  )
}

export default SkillListItem
