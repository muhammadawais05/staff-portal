import { SubSection } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

export interface Props {
  avatar: ReactNode
  talentLink: ReactNode
  publicProfile: ReactNode
  list: ReactNode
  'data-testid'?: string
}

const HiredTalentRowContentLayout = ({
  avatar,
  talentLink,
  publicProfile,
  list,
  'data-testid': dataTestId
}: Props) => (
  <SubSection data-testid={dataTestId}>
    <Container
      flex
      alignItems='center'
      bottom='small'
      left='small'
      right='small'
    >
      <Container right='small'>{avatar}</Container>
      <Container flex css={S.talentLink}>
        {talentLink}
      </Container>
      <Container flex alignItems='center' left='small'>
        <Container left='small'>{publicProfile}</Container>
      </Container>
    </Container>
    {list}
  </SubSection>
)

export default HiredTalentRowContentLayout
