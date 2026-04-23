import React, { ReactElement } from 'react'

import * as S from './styles'

const ConditionalWrapSkillTag = ({
  skillPage,
  children
}: {
  skillPage: string | null | undefined
  children: ReactElement
}) =>
  skillPage ? (
    <a href={skillPage} css={S.link} data-testid='skill-tag-link'>
      {children}
    </a>
  ) : (
    children
  )

export default ConditionalWrapSkillTag
