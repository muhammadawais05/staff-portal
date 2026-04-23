import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCurrentUserResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        email: 'john-3d51048235c9d1a8@toptal.io',
        fullName: 'John Doe',
        type: 'Staff',
        timeZone: {
          name: '(UTC+03:00) Europe - Moscow',
          value: 'Europe/Moscow',
          __typename: 'TimeZone'
        },
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
