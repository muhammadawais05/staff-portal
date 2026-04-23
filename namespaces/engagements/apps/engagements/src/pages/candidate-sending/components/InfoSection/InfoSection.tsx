import React, { ReactNode } from 'react'
import { Typography, Container } from '@toptal/picasso'

type Props = {
  children: ReactNode
}

const InfoSection = ({ children }: Props) => (
  <Container bottom='medium'>
    <Typography variant='heading' size='small'>
      {children}
    </Typography>
  </Container>
)

export default InfoSection
