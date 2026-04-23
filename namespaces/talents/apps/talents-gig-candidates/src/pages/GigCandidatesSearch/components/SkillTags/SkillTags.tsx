import React from 'react'
import { Container, Tag, Typography } from '@toptal/picasso'
import { SkillTag } from '@staff-portal/talents'

import { SkillPair } from '../../types'
import * as S from './styles'

interface Props {
  skills: SkillPair[]
  disableNoRating?: boolean
}

interface WhiteTagProps {
  name: string
  disabled?: boolean
}

export const WhiteTag = ({ name, disabled }: WhiteTagProps) => (
  <Tag
    css={S.whiteTag}
    data-testid={disabled ? 'skill-white-tag-disabled' : 'skill-white-tag'}
  >
    <Container forwardedAs='span' css={S.skillName}>
      <Typography color={disabled ? 'grey' : 'dark-grey'}>{name}</Typography>
    </Container>
  </Tag>
)

const SkillTags = ({ skills, disableNoRating = false }: Props) => {
  return (
    <>
      {skills.map(skill =>
        skill.rating ? (
          <SkillTag
            key={skill.name}
            name={skill.name}
            rating={skill.rating}
            hasLink={false}
          />
        ) : (
          <WhiteTag
            key={skill.name}
            name={skill.name}
            disabled={disableNoRating}
          />
        )
      )}
    </>
  )
}

export default SkillTags
