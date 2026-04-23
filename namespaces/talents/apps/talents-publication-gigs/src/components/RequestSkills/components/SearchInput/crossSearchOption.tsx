import React from 'react'
import { Typography, Container } from '@toptal/picasso'

import * as S from './styles'
import { SEARCH_TYPES } from '../../types'

const crossSearchOption = (name: string, type: SEARCH_TYPES) => ({
  crossSearchType: type,
  text: `cross-search:${type}`,
  render: (value: string) => (
    <Container forwardedAs='span'   css={S.smallFont}>
      <Typography as='span' color='dark-grey'>
        Search as {name}:{' '}
      </Typography>
      {value}
    </Container>
  )
})

export default crossSearchOption
