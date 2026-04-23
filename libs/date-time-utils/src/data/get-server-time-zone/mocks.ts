import { GetServerTimeZoneDocument } from './get-server-time-zone.staff.gql.types'

export const createGetServerTimeZoneMock = ({
  userId = 'VjEtTWUtMTAwMDEw',
  timeZone = 'America/New_York',
  timeZoneName = '(UTC-05:00) America - New York'
}: {
  userId?: string
  timeZone?: string
  timeZoneName?: string
} = {}) => ({
  request: { query: GetServerTimeZoneDocument },
  result: {
    data: {
      viewer: {
        me: {
          id: userId,
          __typename: 'Staff'
        },
        serverTimeZone: {
          name: timeZoneName,
          value: timeZone,
          __typename: 'ServerTimeZone'
        },
        __typename: 'Viewer'
      }
    }
  }
})

export const createGetServerTimeZoneFailedMock = (
  errorMessage = 'fake error message.'
) => ({
  request: { query: GetServerTimeZoneDocument },
  error: new Error(errorMessage)
})
