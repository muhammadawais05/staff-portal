import React, { useMemo } from 'react'
import { Container, Button, BackMinor16, Typography, ChevronMinor16 } from '@toptal/picasso'

import * as S from './styles'

type Props = {
  selectedDate: Date
  updateMonth: (diff: number) => void
}

const INCREASE_MONTH = 1
const DECREASE_MONTH = -1

const Actions = ({
  selectedDate,
  updateMonth
}: Props) => {
  const label = useMemo(() => selectedDate.toLocaleString('default', { month: 'long' }) + ' ' + selectedDate.getFullYear(),
    [selectedDate])

  return <Container flex>
    <Button.Circular
      variant='flat'
      icon={<BackMinor16 />}
      onClick={() => updateMonth(DECREASE_MONTH)}
      data-testid='calendar-skeleton-actions-decrease'
    />
    <Container
      inline
      flex
      css={S.month}
      alignItems='center'
      direction='column'
      padded={0.2}
    >
      <Typography
        weight='semibold'
        size='xsmall'
        data-testid='calendar-skeleton-label'
      >
        {label}
      </Typography>
    </Container>
    <Button.Circular
      variant='flat'
      icon={<ChevronMinor16 />}
      onClick={() => updateMonth(INCREASE_MONTH)}
      data-testid='calendar-skeleton-actions-increase'
    />
  </Container>
}

export default Actions
