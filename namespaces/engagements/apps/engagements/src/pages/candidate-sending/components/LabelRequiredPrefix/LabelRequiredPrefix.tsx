import React from 'react'
import { Container, Typography } from '@toptal/picasso'

const LabelRequiredPrefix = () => (
  <Container as='span' right='xsmall'>
    <Typography as='span' color='red'>
      *
    </Typography>
  </Container>
)

export default LabelRequiredPrefix
