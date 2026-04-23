import React, { useCallback, useState } from 'react'
import { Container, Section } from '@toptal/picasso'
import { ContainerLoader, DayOffCalendar } from '@staff-portal/ui'
import {
  getCurrentDateWithTimeZone,
  setMonth,
  WEEK_STARTS_ON
} from '@staff-portal/date-time-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { useGetDayOffs } from './data/get-days-off.staff.gql'
import Skeleton from './components/Skeleton/Skeleton'
import { getMonthRange } from './services'
import Actions from './components/Actions/Actions'

type Props = {
  staffId: string
  title?: string
}

const CalendarSection = ({ staffId, title = 'Calendar' }: Props) => {
  const currentUser = useGetCurrentUser()
  const currentDate = getCurrentDateWithTimeZone(currentUser?.timeZone?.value || '')
  const [selectedDate, setSelectedDate] = useState<Date>(currentDate)
  const { dayOffs, refetch, loading, initialLoading } = useGetDayOffs({
    staffId,
    selectedDate
  })
  const updateMonth = useCallback(
    (diff: number) => {
      const date = setMonth(selectedDate, selectedDate.getMonth() + diff)

      refetch({
        staffId,
        ...getMonthRange(date)
      })
      setSelectedDate(date)
    },
    [selectedDate, refetch, staffId]
  )

  return (
    <Container top='medium'>
      <Section
        variant='withHeaderBar'
        title={title}
        actions={
          !initialLoading && (
            <Actions updateMonth={updateMonth} selectedDate={selectedDate} />
          )
        }
      >
        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={<Skeleton />}
        >
          <DayOffCalendar
            today={currentDate}
            dayOffs={loading ? new Set<number>([]) : dayOffs}
            activeMonth={selectedDate}
            minDate={currentDate}
            weekStartsOn={WEEK_STARTS_ON}
          />
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default CalendarSection
