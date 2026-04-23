import React, { useCallback } from 'react'
import Calendar, { DayProps } from '@toptal/picasso/Calendar'

import DayOffCalendarDay from '../DayOffCalendarDay/DayOffCalendarDay'
import DayOffCalendarRoot from '../DayOffCalendarRoot/DayOffCalendarRoot'

interface Props {
  dayOffs: Set<number>
  minDate?: Date
  activeMonth?: Date
  weekStartsOn?: number
  today: Date
}

const renderMonthHeader = () => null
const handleOnChange = () => null

const DayOffCalendar = ({ dayOffs, today, ...rest }: Props) => {
  const handleRenderDay = useCallback(
    (dayProps: DayProps) => <DayOffCalendarDay {...dayProps} dayOffs={dayOffs} today={today} />,
    [dayOffs, today]
  )

  return (
    <Calendar
      {...rest}
      onChange={handleOnChange}
      renderDay={handleRenderDay}
      renderMonthHeader={renderMonthHeader}
      renderRoot={DayOffCalendarRoot}
    />
  )
}

export default DayOffCalendar
