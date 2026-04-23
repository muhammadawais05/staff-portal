import React from 'react'
import { Tooltip, Typography, QuestionMark16, Container } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  isDismissed: boolean
  children: React.ReactNode
}

const FIELD_VALUE = 'N/A'

const DismissedCell = ({ isDismissed, children }: Props) => {
  if (!isDismissed) {
    return <>{children}</>
  }

  return (
    <Tooltip content='The call was dismissed'>
      <Container flex>
        <Typography css={S.dismissedCellText}>{FIELD_VALUE}</Typography>
        <QuestionMark16 />
      </Container>
    </Tooltip>
  )
}

export default DismissedCell
