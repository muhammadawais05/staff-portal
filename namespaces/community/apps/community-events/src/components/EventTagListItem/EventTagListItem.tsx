import React, { memo } from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'

import { EventTag } from '../../types'
import UpdateEventTagButton from '../UpdateEventTagButton/UpdateEventTagButton'
import RemoveEventTagButton from '../RemoveEventTagButton/RemoveEventTagButton'
import ToggleEnabledEventTagButton from '../ToggleEnabledEventTagButton/ToggleEnabledEventTagButton'

interface Props {
  eventTag: EventTag
}

const EventTagListItem = ({ eventTag }: Props) => {
  return (
    <Container
      flex
      justifyContent='space-between'
      data-testid='event-tag-list-item'
    >
      <TypographyOverflow weight='semibold'>
        {eventTag.title}
      </TypographyOverflow>

      <Container>
        <ToggleEnabledEventTagButton eventTag={eventTag} />
        <UpdateEventTagButton eventTag={eventTag} />
        <RemoveEventTagButton eventTag={eventTag} />
      </Container>
    </Container>
  )
}

export default memo(EventTagListItem)
