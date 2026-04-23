import React from 'react'
import { Container } from '@toptal/picasso'

import { wrapper } from './styles'

export const FaceGuide = () => (
  <Container css={wrapper}>
    <svg viewBox='0 0 170 236' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M84.92 236C30.976 236 0 192.82 0 118S30.975 0 84.92 0c53.946 0 84.921 43.18 84.921 118s-30.975 118-84.92 118zm0-3.95c51.429 0 80.971-41.18 80.971-114.05S136.35 3.95 84.921 3.95 3.95 45.13 3.95 118s29.542 114.05 80.97 114.05z'
        fill='#204ECF'
      />
    </svg>
  </Container>
)
