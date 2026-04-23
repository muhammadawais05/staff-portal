import { Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

interface Props {
  header?: ReactNode
  content: ReactNode
}

const CommunityLeaderSection = ({ header, content }: Props) => (
  <Container css={S.card} rounded>
    {header}
    {content}
  </Container>
)

export default CommunityLeaderSection
