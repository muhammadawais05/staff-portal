import { Container } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

const BottomContent = () => (
  <Container css={S.bottomContainer}>
    <Container css={S.bottomUpContainer}>
      {/* this is used to render help button using react portal */}
      <div id='help-button-portal' css={S.helpButtonPortal} />
    </Container>
  </Container>
)

export default BottomContent
