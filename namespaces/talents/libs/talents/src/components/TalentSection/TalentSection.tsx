import { Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { FlattenSimpleInterpolation } from 'styled-components'

import * as S from './styles'

interface Props {
  header: ReactNode
  content: ReactNode
  actions?: ReactNode
  styles?: FlattenSimpleInterpolation
}

const TalentSection = ({ header, content, actions, styles }: Props) => {
  return <Container css={styles} data-testid='talent-section'>
    <Container
      css={S.headerContainer}
      bottom='medium'
      data-testid='talent-card-section'
    >
      {header}
      {actions && (
        <Container flex css={S.actionsContainer} data-testid='talent-actions'>
          {actions}
        </Container>
      )}
    </Container>
    <Container data-testid='talent-content'>{content}</Container>
  </Container>
}

export default TalentSection
