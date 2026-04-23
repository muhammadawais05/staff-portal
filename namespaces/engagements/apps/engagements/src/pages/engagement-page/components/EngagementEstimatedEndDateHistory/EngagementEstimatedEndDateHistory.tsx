import React, { useMemo } from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { HistoryWidget } from '@staff-portal/chronicles'

import { HISTORY_ITEMS_LIMIT, HISTORY_LIST_EMPTY_STATE } from './config'

export interface Props {
  engagementId: string
  pollInterval: number
}

const EngagementEstimatedEndDateHistory = ({
  engagementId,
  pollInterval
}: Props) => {
  const { feeds, actions } = useMemo(() => {
    const { type, id } = decodeEntityId(engagementId)

    return { feeds: [[encodeGid(type, id)]], actions: ['proposed'] }
  }, [engagementId])

  return (
    <Container>
      <TypographyOverflow size='small' variant='heading'>
        History of End Date Updates
      </TypographyOverflow>

      <HistoryWidget
        feeds={feeds}
        actions={actions}
        limit={HISTORY_ITEMS_LIMIT}
        pollInterval={pollInterval}
        emptyState={HISTORY_LIST_EMPTY_STATE}
      />
    </Container>
  )
}

export default EngagementEstimatedEndDateHistory
