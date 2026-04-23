import React from 'react'
import { Tooltip, Container, Typography, QuestionMark16 } from '@toptal/picasso'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { TalentDeltaWaitingTimeFragment } from '../../data/talent-delta-waiting-time-fragment'

const getDeltaWaitingDaysText = (
  deltaWaitingDays: TalentDeltaWaitingTimeFragment['deltaWaitingDays']
) => {
  if (deltaWaitingDays === null) {
    return 'Not active'
  }

  return deltaWaitingDays === 1
    ? `${deltaWaitingDays} day`
    : `${deltaWaitingDays} days`
}

export type Props = {
  deltaWaitingDays: TalentDeltaWaitingTimeFragment['deltaWaitingDays']
  lastClosedEngagementEndDate: TalentDeltaWaitingTimeFragment['lastClosedEngagementEndDate']
  lastAvailabilityIncreaseDate: TalentDeltaWaitingTimeFragment['lastAvailabilityIncreaseDate']
  trialsNumber: TalentDeltaWaitingTimeFragment['engagements']['counters']['trialsNumber']
}

const DeltaWaitingTimeField = ({
  deltaWaitingDays,
  lastClosedEngagementEndDate,
  lastAvailabilityIncreaseDate,
  trialsNumber
}: Props) => {
  const userDateFormatter = useUserDateFormatter()

  const deltaWaitingDaysText = getDeltaWaitingDaysText(deltaWaitingDays)

  const lastEngagementDateText =
    lastClosedEngagementEndDate === null
      ? trialsNumber === 0
        ? 'never engaged before'
        : 'in progress'
      : userDateFormatter(lastClosedEngagementEndDate)

  const lastTimeIncreasedAvailabilityText =
    lastAvailabilityIncreaseDate === null
      ? 'inactive'
      : userDateFormatter(lastAvailabilityIncreaseDate)

  return deltaWaitingDays === null ? (
    <>{deltaWaitingDaysText}</>
  ) : (
    <Container as='span' flex alignItems='center' inline>
      <Typography
        as='span'
        weight='semibold'
        color={deltaWaitingDays && deltaWaitingDays > 90 ? 'red' : 'inherit'}
      >
        {deltaWaitingDaysText}
      </Typography>

      <Tooltip
        content={
          <>
            <Typography>
              Delta between now and when they became last available or when was
              their last engagement. For how long this talent is waiting for us
              to give them a project.
              <br />
              <br />
              <Typography as='span' weight='semibold'>
                Last engagement date
              </Typography>
              : {lastEngagementDateText}
              <br />
              <Typography as='span' weight='semibold'>
                Last time increased availability
              </Typography>
              : {lastTimeIncreasedAvailabilityText}
            </Typography>
          </>
        }
        interactive
      >
        <Container
          as='span'
          left='xsmall'
          flex
          alignItems='center'
          data-testid='waiting-time-tooltip-icon'
        >
          <QuestionMark16 color='dark-grey' />
        </Container>
      </Tooltip>
    </Container>
  )
}

export default DeltaWaitingTimeField
