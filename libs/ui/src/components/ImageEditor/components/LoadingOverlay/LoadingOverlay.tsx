import React from 'react'
import { Loader, Container } from '@toptal/picasso'

import { overlayContainer } from './styles'

export const LoadingOverlay = () => (
  <Container
    flex
    justifyContent='center'
    alignItems='center'
    css={overlayContainer}
  >
    <Loader />
  </Container>
)
