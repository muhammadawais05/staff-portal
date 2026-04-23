import { isSameDay } from '@staff-portal/date-time-utils'
import { Container } from '@toptal/picasso'
import { DayProps } from '@toptal/picasso/Calendar'
import React from 'react'

import * as S from './styles'

type Props = {
  dayOffs: Set<number>
  today: Date
} & DayProps

const DayOffCalendarDay = ({
  isSelectable,
  isMonthNext,
  isMonthPrev,
  getDayFormatted,
  date,
  dayOffs,
  today
}: Props) => {
  if (isMonthPrev || isMonthNext) {
    return <div css={S.dayBase} data-testid='day-off-calendar-day-empty-container' />
  }

  const currentDate = getDayFormatted(date)

  return (
    <Container
      flex
      alignItems='center'
      justifyContent='center'
      data-testid={`day-off-calendar-day-date-container-${currentDate}`}
      css={S.day({
        isDisabled: !isSelectable,
        isSelected: dayOffs.has(date.getDate()),
        // Once the today prop would be added, remove such a hack
        // https://toptal-core.atlassian.net/browse/FX-2775
        isToday: isSameDay(date, today)
      })}
    >
      {currentDate}
    </Container>
  )
}

export default DayOffCalendarDay
