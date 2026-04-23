import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getServerTimezoneResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      serverTimeZone: {
        value: 'America/New_York',
        name: '(UTC-05:00) America - New York',
        __typename: 'ServerTimeZone'
      },
      __typename: 'Viewer'
    }
  }
})
