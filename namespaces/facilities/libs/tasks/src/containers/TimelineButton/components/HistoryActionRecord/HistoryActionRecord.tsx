import React, { memo } from 'react'
import { Tasks16 } from '@toptal/picasso'
import { HistoryEntry, Entry } from '@staff-portal/chronicles'

export type Props = {
  entity: Entry
  expanded: boolean
  hasConnector: boolean
  onExpandClick: (id: string) => void
}

const HistoryActionRecord = ({
  entity,
  expanded,
  hasConnector,
  onExpandClick
}: Props) => (
  <HistoryEntry
    entry={entity}
    expanded={expanded}
    hasConnector={hasConnector}
    onClick={onExpandClick}
    icon={<Tasks16 />}
  />
)

export default memo(HistoryActionRecord)
