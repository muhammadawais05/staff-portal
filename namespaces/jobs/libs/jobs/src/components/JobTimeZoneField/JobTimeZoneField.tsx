import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { JobHoursOverlap, Maybe } from '@staff-portal/graphql/staff'
import { TimeZoneFragment } from '@staff-portal/date-time-utils'

import { formatJobTimezone } from '../../utils'

export type Props = {
  timeZonePreference: Maybe<TimeZoneFragment> | undefined
  hoursOverlap?: Maybe<JobHoursOverlap>
} & (
  | {
      usePreferredHoursCheck?: true
      hasPreferredHours: Maybe<boolean> | undefined
    }
  | {
      usePreferredHoursCheck: false
      hasPreferredHours?: never
    }
)

const JobTimeZoneField = ({
  timeZonePreference,
  usePreferredHoursCheck = true,
  hasPreferredHours,
  hoursOverlap
}: Props) => {
  const timeZoneName = timeZonePreference?.name

  let timezoneText

  if ((usePreferredHoursCheck && !hasPreferredHours) || !timeZoneName) {
    timezoneText = 'No preference'
  } else {
    timezoneText = hoursOverlap
      ? formatJobTimezone(timeZoneName, hoursOverlap)
      : timeZoneName
  }

  return (
    <TypographyOverflow
      tooltipDelay='short'
      data-testid='timezone-info'
      size='medium'
    >
      {timezoneText}
    </TypographyOverflow>
  )
}

export default JobTimeZoneField
