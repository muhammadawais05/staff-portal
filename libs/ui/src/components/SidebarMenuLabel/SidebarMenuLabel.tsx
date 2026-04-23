import React from 'react'
import { Typography, Container } from '@toptal/picasso'

import * as S from './styles'
import CounterLabel from './components/CounterLabel'

export interface Props {
  counter?: {
    name: string
    total: number
    unread: number
  }
  label: string
}

const SidebarMenuLabel = ({ counter, label }: Props) => {
  return (
    // TODO: replace with <Fragment/> when https://toptal-core.atlassian.net/browse/FX-562 is resolved
    <Container css={S.menuLabelWrapper} alignItems='center'>
      <Container>
        <Typography color='inherit' size='medium'>
          {label}
        </Typography>
      </Container>
      <Container css={S.labelContainer}>
        {counter && (
          <CounterLabel total={counter.total} unread={counter.unread} />
        )}
      </Container>
    </Container>
  )
}

export default SidebarMenuLabel
