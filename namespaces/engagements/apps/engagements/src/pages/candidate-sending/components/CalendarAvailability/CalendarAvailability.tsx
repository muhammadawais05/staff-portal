import { TimeSlotsPerDay } from '@staff-portal/graphql/staff'
import { Container, QuestionMark16, Tooltip, Typography } from '@toptal/picasso'
import pluralize from 'pluralize'
import React from 'react'

import CalendarAvailabilityTooltipContent from '../CalendarAvailabilityTooltipContent/CalendarAvailabilityTooltipContent'
import { getTotalOverlapping } from './utils'

export interface Props {
  talentCalendarAvailability: TimeSlotsPerDay[]
}

const CalendarAvailability = ({ talentCalendarAvailability }: Props) => {
  const totalOverlapping = getTotalOverlapping(talentCalendarAvailability)

  return (
    <Tooltip
      interactive
      content={
        <CalendarAvailabilityTooltipContent
          talentCalendarAvailability={talentCalendarAvailability}
        />
      }
    >
      <Container
        inline
        flex
        alignItems='center'
        data-testid='calendar-availability'
      >
        <Typography>
          {pluralize('overlapping timeslot', totalOverlapping, true)} over next{' '}
          {pluralize('days', talentCalendarAvailability.length, true)}
        </Typography>
        <Container left='xsmall' flex alignItems='center'>
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Container>
    </Tooltip>
  )
}

export default CalendarAvailability
