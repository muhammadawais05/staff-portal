import { TimeZoneFragment } from '@staff-portal/date-time-utils'

export const availableTimezonesMock =
  (): TimeZoneFragment[] => [
    {
      name: '(UTC+01:00) Europe - London',
      value: 'Europe/London'
    },
    {
      name: '(UTC+02:00) Europe - Berlin',
      value: 'Europe/Berlin'
    },
    {
      name: '(UTC+04:00) Asia - Dubai',
      value: 'Asia/Dubai'
    },
    {
      name: '(UTC-04:00) America - Puerto Rico',
      value: 'America/Puerto_Rico'
    }
  ]
