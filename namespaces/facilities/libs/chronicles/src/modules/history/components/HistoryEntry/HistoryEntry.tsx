import React, { memo } from 'react'

import { Entry, HistoryWidgetVariant } from '../../types'
import HistoryEntryRow from '../HistoryEntryRow'
import * as S from './styles'
import HistoryEntryComment from '../HistoryEntryComment'
import HistoryEntryContent from '../HistoryEntryContent'

export interface Props {
  entry: Entry
  icon?: JSX.Element
  expanded?: boolean
  hasConnector?: boolean
  stripeEven?: boolean
  variant?: HistoryWidgetVariant
  onClick?: (id: string) => void
}

const HistoryEntry = ({
  entry,
  icon,
  expanded = false,
  hasConnector = true,
  stripeEven,
  variant,
  onClick = () => {}
}: Props) => {
  const { performedAction, literals } = entry
  const { occurredAt, comment, id, performerGID } = performedAction

  return (
    <HistoryEntryRow
      id={id}
      date={occurredAt}
      content={<HistoryEntryContent literals={literals} />}
      comment={
        comment && (
          <HistoryEntryComment
            comment={comment}
            style={S.commentWrapper(variant)}
            // we do not html escape comments added by system (performerGID: null)
            escapeHtml={Boolean(performerGID)}
          />
        )
      }
      icon={icon}
      expanded={expanded}
      variant={variant}
      hasConnector={hasConnector}
      stripeEven={stripeEven}
      onExpandClick={onClick}
    />
  )
}

export default memo(HistoryEntry)
