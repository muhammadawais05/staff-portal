import React, { ReactNode } from 'react'
import { Typography, Timeline } from '@toptal/picasso'

import ExpandableContent from '../ExpandableContent'

type Props = {
  id: string
  icon?: JSX.Element
  content: ReactNode
  comment: ReactNode
  expanded?: boolean
  isExpandable?: boolean
  dateFormatted: string
  hasConnector: boolean
  onExpandClick?: () => void
}

const HistoryEntryTimelineRow = ({
  id,
  icon,
  content,
  comment,
  expanded = false,
  isExpandable,
  dateFormatted,
  hasConnector,
  onExpandClick
}: Props) => (
  <Timeline.Row
    data-testid={`entry-row-${id}`}
    hasConnector={hasConnector}
    date={dateFormatted}
    icon={icon}
  >
    {isExpandable ? (
      <ExpandableContent
        comment={comment}
        expanded={expanded}
        onExpandClick={onExpandClick}
      >
        {content}
      </ExpandableContent>
    ) : (
      <Typography size='medium' as='div'>
        {content}
      </Typography>
    )}
  </Timeline.Row>
)

export default HistoryEntryTimelineRow
