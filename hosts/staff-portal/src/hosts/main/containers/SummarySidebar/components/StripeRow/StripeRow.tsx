import { Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

export interface Props {
  children: ReactNode
}

const StripeRow = ({ children }: Props) => {
  return <Container css={S.stripeRow}>{children}</Container>
}

export default StripeRow
