import React from 'react'
import { Tag, Container } from '@toptal/picasso'

import * as S from './styles'

type Props = {
  title?: string | null
  experience?: number | null
}

const TalentCardSkillTag = ({ title, experience }: Props) => {
  if (!title) {
    return null
  }

  const name = title + (experience ? ` (${experience})` : '')

  return (
    <Tag variant='light-grey' data-testid='skill-tag' css={S.tag}>
      <Container inline css={S.skillName}>
        {name}
      </Container>
    </Tag>
  )
}

export default TalentCardSkillTag
