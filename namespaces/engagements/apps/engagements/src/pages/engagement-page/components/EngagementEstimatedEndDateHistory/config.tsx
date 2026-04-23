import React from 'react'
import { Container, Search16 } from '@toptal/picasso'

export const HISTORY_POLL_INTERVAL = 4000
export const HISTORY_POLL_DURATION = 20000
export const HISTORY_ITEMS_LIMIT = 50

export const HISTORY_LIST_EMPTY_STATE = {
  children: (
    <Container flex as='span' top='small'>
      There is no history available
    </Container>
  ),
  icon: (
    <Container top='small'>
      <Search16 />
    </Container>
  )
}
