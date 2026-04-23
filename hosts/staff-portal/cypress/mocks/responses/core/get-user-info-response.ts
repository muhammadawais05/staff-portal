import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getUserInfoResponse = () => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        fullName: 'John Doe',
        type: 'Staff',
        photo: null,
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
