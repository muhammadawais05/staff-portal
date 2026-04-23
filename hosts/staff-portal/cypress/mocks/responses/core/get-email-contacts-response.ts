import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getEmailContactsResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        contacts: {
          nodes: [],
          __typename: 'ContactConnection'
        },
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
