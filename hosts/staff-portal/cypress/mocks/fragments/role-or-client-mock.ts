import { RoleOrClient } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const roleOrClientMock = (node?: Partial<RoleOrClient>) =>
  ({
    id: encodeEntityId('123', 'Client'),
    fullName: 'Full Name',
    webResource: {
      text: 'Some Web Resource Text',
      url: 'https://staging.toptal.net/platform/staff/staff/1680509',
      __typename: 'Link'
    },
    ...node
  } as RoleOrClient)
