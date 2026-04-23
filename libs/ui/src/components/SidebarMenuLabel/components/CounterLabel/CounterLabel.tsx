/* eslint-disable complexity */
import { Tag, Typography, Container } from '@toptal/picasso'
import React, { ReactNode } from 'react'

import * as S from './styles'

const TagContainer = ({ children }: { children: ReactNode }) => (
  <Container left='small' css={S.counterLabel}>
    <Tag>{children}</Tag>
  </Container>
)

const getDisplayedTotal = (total: number, unread: number) =>
  total > unread ? total - unread : null

type Props = {
  unread: number
  total: number
}
const CounterLabel = ({ unread = 0, total = 0 }: Props) => {
  if (total > 0 && !unread) {
    return <TagContainer>{total}</TagContainer>
  }

  if (unread > 0 && !total) {
    return (
      <TagContainer>
        <Typography inline color='red'>
          + {unread}
        </Typography>
      </TagContainer>
    )
  }

  if (unread && total) {
    return (
      <TagContainer>
        {getDisplayedTotal(total, unread)}{' '}
        <Typography inline color='red'>
          + {unread}
        </Typography>
      </TagContainer>
    )
  }

  return null
}

export default CounterLabel
