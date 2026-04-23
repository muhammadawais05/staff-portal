import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'

interface Props {
  title: string | ReactNode
  subtitle: string
}

const SearchBarOption = ({ title, subtitle }: Props) => {
  return (
    <Container>
      <Typography size='xsmall' color='black'>
        {title}
      </Typography>
      <Typography size='xsmall' color='dark-grey'>
        {subtitle}
      </Typography>
    </Container>
  )
}

export default SearchBarOption
