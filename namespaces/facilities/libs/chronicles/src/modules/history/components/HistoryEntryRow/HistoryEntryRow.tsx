import React, { memo, ReactNode, useCallback } from 'react'
import {
  formatDate,
  getDateWithoutTimezone,
  DEFAULT_FULL_DATE_FORMAT
} from '@staff-portal/date-time-utils'

import { HistoryWidgetVariant } from '../../types'
import HistoryEntryTableRow from '../HistoryEntryTableRow'
import HistoryEntryTimelineRow from '../HistoryEntryTimelineRow'

export type Props = {
  id: string
  icon?: JSX.Element
  content: ReactNode
  comment: ReactNode
  date: string
  expanded: boolean
  variant?: HistoryWidgetVariant
  stripeEven?: boolean
  hasConnector: boolean
  onExpandClick?: (id: string) => void
}

const HistoryEntryRow = ({
  id,
  icon,
  content,
  comment,
  date,
  expanded,
  onExpandClick,
  variant,
  stripeEven,
  hasConnector
}: Props) => {
  const isExpandable = Boolean(comment)
  const dateFormatted = formatDate(getDateWithoutTimezone(date), {
    dateFormat: DEFAULT_FULL_DATE_FORMAT
  })
  const handleOnExpandClick = useCallback(
    () => onExpandClick?.(id),
    [id, onExpandClick]
  )
  const props = {
    content,
    comment,
    expanded,
    isExpandable,
    dateFormatted
  }

  if (variant === 'table') {
    return (
      <HistoryEntryTableRow
        {...props}
        stripeEven={stripeEven}
        onClick={handleOnExpandClick}
      />
    )
  }

  return (
    <HistoryEntryTimelineRow
      {...props}
      id={id}
      icon={icon}
      hasConnector={hasConnector}
      onExpandClick={handleOnExpandClick}
    />
  )
}

export default memo(HistoryEntryRow)
