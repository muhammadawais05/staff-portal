import React from 'react'
import { Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import * as S from './styles'

const MultilineTextViewer = ({
  value,
  'data-testid': testId
}: {
  value: string | undefined | null
  'data-testid'?: string
}) => (
  <Typography data-testid={testId} css={S.wordBreak}>
    {value || NO_VALUE}
  </Typography>
)

export default MultilineTextViewer
