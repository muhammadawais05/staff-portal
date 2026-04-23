import React, { Fragment } from 'react'
import { UnsafeAdvancedHtmlFormatter } from '@staff-portal/string'
import { CSSProp } from 'styled-components'

type Props = {
  comment: string | null
  escapeHtml: boolean
  style?: CSSProp
}

const HistoryEntryComment = ({ comment, escapeHtml, style }: Props) => {
  if (!comment) {
    return null
  }

  if (!escapeHtml) {
    const formattedComment = comment.replace(/[\n\r]+/g, '<br/>')

    return (
      <UnsafeAdvancedHtmlFormatter
        data-testid='entry-comment'
        css={style}
        html={formattedComment}
      />
    )
  }

  const commentLines = comment.split(/[\n\r]+/)

  return (
    <div data-testid='entry-comment' css={style}>
      {commentLines.map((commentLine, index) => (
        // No identifiers for comments; comments are not guaranteed to be unique
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>
          {index > 0 && <br />}
          {commentLine}
        </Fragment>
      ))}
    </div>
  )
}

export default HistoryEntryComment
