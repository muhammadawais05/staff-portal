import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTeamsWithEmailTrackingResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        teams: {
          nodes: [],
          __typename: 'TeamConnection'
        },
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
