import React from 'react'
import { Container, Loader } from '@toptal/picasso'

import * as S from './styles'

export interface Props {}

const PageLoader = () => {
  return (
    <Container css={S.container}>
      <Loader css={S.centeredLoader} size='large'>
        Loading, please wait…
      </Loader>
    </Container>
  )
}

export default PageLoader
