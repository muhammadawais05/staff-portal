import { Maybe } from '@toptal/picasso/utils'
import { InterviewKind } from '@staff-portal/graphql/staff'
import { TimeZoneFragment } from '@staff-portal/date-time-utils'

export const getInterviewModalTimeZone = ({
  timeZone,
  kind,
  currentUserTimeZone,
  clientTimeZone
}: {
  timeZone: Maybe<TimeZoneFragment>
  kind: Maybe<InterviewKind>
  currentUserTimeZone: Maybe<TimeZoneFragment>
  clientTimeZone: Maybe<TimeZoneFragment>
}) =>
  (
    timeZone ??
    (kind === InterviewKind.INTERNAL ? currentUserTimeZone : clientTimeZone)
  )?.value ?? ''
