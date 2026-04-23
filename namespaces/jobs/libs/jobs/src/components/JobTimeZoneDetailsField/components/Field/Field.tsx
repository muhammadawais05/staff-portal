import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'

import * as S from './styles'

type Props = {
  label: string
  value: string | null
}

const Field = ({ label, value }: Props) => {
  if (!value) {
    return null
  }

  return (
    <Container flex justifyContent='space-between'>
      <TypographyOverflow size='medium' weight='regular' css={S.label}>
        {label}
      </TypographyOverflow>
      <TypographyOverflow size='medium'>{value}</TypographyOverflow>
    </Container>
  )
}

export default Field
