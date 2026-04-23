import { TimeZone } from '@staff-portal/graphql/staff'

export const timeZoneMock = (timezone?: Partial<TimeZone>) =>
  ({
    name: '(UTC-04:00) America - New York',
    value: 'America/New_York',
    __typename: 'TimeZone',
    ...timezone
  } as TimeZone)
