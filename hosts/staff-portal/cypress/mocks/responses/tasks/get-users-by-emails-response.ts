import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getUsersByEmailsResponse = () => ({
  data: {
    communicationTrackingRoles: {
      nodes: [
        {
          id: encodeEntityId('123', 'Staff'),
          email: 'vino-cda0a646c026dc62@toptal.io',
          fullName: 'Vinod Sukumaran',
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/staff/1680639',
            __typename: 'Link'
          },
          __typename: 'Staff'
        }
      ],
      __typename: 'RoleOrClientNullableSimpleConnection'
    }
  }
})
