import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'

interface Props {
  children: ReactNode
  weight?: 'regular' | 'semibold'
}

const ApproveJobSubtitle = ({ children, weight = 'semibold' }: Props) => (
  <Container bottom='small'>
    <Typography size='medium' weight={weight}>
      {children}
    </Typography>
  </Container>
)

export default ApproveJobSubtitle
