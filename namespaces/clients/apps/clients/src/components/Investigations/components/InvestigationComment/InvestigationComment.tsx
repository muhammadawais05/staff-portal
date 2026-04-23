import React from 'react'
import { Typography, ShowMore } from '@toptal/picasso'

import { Investigation } from '../../types'
import * as S from './styles'

interface Props {
  comment: Investigation['comment']
}

const LENGTH_BEFORE_SHOW_MORE = 258

const InvestigationComment = ({ comment }: Props) => {
  return comment.length > LENGTH_BEFORE_SHOW_MORE ? (
    <ShowMore rows={2} css={S.comment}>
      {comment}
    </ShowMore>
  ) : (
    <Typography size='medium'>{comment}</Typography>
  )
}

export default InvestigationComment
