import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'

import * as S from './styles'

const DraftJobContentRow = ({ children }: { children: ReactNode }) => (
  <Container padded='small' css={S.row}>
    <Typography as='div' size='medium'>
      {children}
    </Typography>
  </Container>
)

export default DraftJobContentRow
