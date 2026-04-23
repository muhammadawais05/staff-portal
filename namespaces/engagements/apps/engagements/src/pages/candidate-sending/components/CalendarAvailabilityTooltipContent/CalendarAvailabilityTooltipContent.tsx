import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { TimeSlotsPerDay } from '@staff-portal/graphql/staff'
import { Typography } from '@toptal/picasso'
import pluralize from 'pluralize'
import React from 'react'

export interface Props {
  talentCalendarAvailability: TimeSlotsPerDay[]
}

const CalendarAvailabilityTooltipContent = ({
  talentCalendarAvailability
}: Props) => (
  <>
    {talentCalendarAvailability.map(({ date, slotsCount }) => (
      <Typography
        key={date}
        data-testid={`calendar-availability-tooltip-content-${date}`}
      >
        <Typography as='span' color='inherit' weight='semibold'>
          {parseAndFormatDate(date, { dateFormat: 'EEEE' })}
        </Typography>
        {': '}
        {pluralize('overlapping slot', slotsCount, true)}
      </Typography>
    ))}
  </>
)

export default CalendarAvailabilityTooltipContent
