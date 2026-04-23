import { Container, Typography } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

interface CommunityExperienceItemProps {
  icon: ReactNode
  topText: string
  bottomText: string
}

const CommunityExperienceItem = ({
  icon,
  topText,
  bottomText
}: CommunityExperienceItemProps) => {
  return (
    <Container flex>

      <Container css={S.iconTopMargin}>{icon}</Container>
      <Container left='xsmall' css={S.flexStyle}>
        <Typography color='black' size='xsmall' weight='semibold'>
          {topText}
        </Typography>
        <Typography size='xsmall'>{bottomText}</Typography>
      </Container>
    </Container>
  )
}

export default CommunityExperienceItem
