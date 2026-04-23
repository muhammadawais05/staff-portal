import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getExpiredCallTimersResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        __typename: 'Staff'
      },
      expiredCallTimers: {
        nodes: [],
        __typename: 'ExpiredCallTimerConnection'
      },
      __typename: 'Viewer'
    }
  }
})
