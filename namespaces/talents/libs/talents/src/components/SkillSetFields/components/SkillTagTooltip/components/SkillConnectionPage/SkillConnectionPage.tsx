import React from 'react'
import { Container } from '@toptal/picasso'

import { Section } from '../../types'
import SkillConnectionSection from '../SkillConnectionSection'
import * as S from './styles'

interface Props {
  sections: Section[]
}

const SkillConnectionPage = ({ sections }: Props) => {
  return <Container css={S.sections}>
    {sections.map(section => (
      <SkillConnectionSection section={section} key={section.name} />
    ))}
  </Container>
}

SkillConnectionPage.displayName = 'SkillConnectionPage'

export default SkillConnectionPage
