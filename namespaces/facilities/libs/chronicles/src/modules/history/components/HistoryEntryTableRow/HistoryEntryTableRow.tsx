import React, { ReactNode } from 'react'
import {
  Typography,
  Table,
  Button,
  ArrowDownMinor16,
  ArrowUpMinor16
} from '@toptal/picasso'
import { NoteCard } from '@staff-portal/ui'

import * as S from './styles'

type Props = {
  content: ReactNode
  comment: ReactNode
  isExpandable?: boolean
  expanded?: boolean
  onClick: () => void
  dateFormatted: string
  stripeEven?: boolean
}

const HistoryEntryTableRow = ({
  content,
  comment,
  isExpandable,
  expanded,
  onClick,
  dateFormatted,
  stripeEven
}: Props) => {
  const shouldDisplayComment = !!comment && !!expanded

  return (
    <>
      <Table.Row
        css={shouldDisplayComment ? S.mainRow : undefined}
        stripeEven={stripeEven}
      >
        <Table.Cell css={S.dateCell}>
          <Typography size='medium' weight='semibold'>
            {dateFormatted}
          </Typography>
        </Table.Cell>
        <Table.Cell css={S.contentCell}>
          <Typography as='div' size='medium'>
            {content}
          </Typography>
        </Table.Cell>

        <Table.Cell align='right' css={S.actionCell}>
          {isExpandable && (
            <Button.Circular
              data-testid='history-entry-table-row-button'
              variant='flat'
              icon={expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
              onClick={onClick}
            />
          )}
        </Table.Cell>
      </Table.Row>

      {shouldDisplayComment && (
        <Table.Row stripeEven={stripeEven}>
          <Table.Cell colSpan={3} css={S.commentCell}>
            <NoteCard css={S.comment}>
              <Typography as='div' size='medium'>
                {comment}
              </Typography>
            </NoteCard>
          </Table.Cell>
        </Table.Row>
      )}
    </>
  )
}

export default HistoryEntryTableRow
