import React, { memo } from 'react'
import { decodeEntityId, encodeGid } from '@staff-portal/data-layer-service'
import { HistoryWidget } from '@staff-portal/chronicles'

export interface Props {
  taskId: string
  pollInterval?: number
}

const TaskHistory = ({ taskId, pollInterval }: Props) => {
  const { id, type } = decodeEntityId(taskId)
  const taskGID = encodeGid(type, id)

  return (
    <HistoryWidget
      pollInterval={pollInterval}
      feeds={[[taskGID]]}
      defaultExpanded
    />
  )
}

// memo is needed here only because watchers in the parent component
// are updated on the level above and whole the DetailsTaskCardContent
// is re-rendered on adding new watcher
export default memo(TaskHistory)
