import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Staff } from '@staff-portal/graphql/staff'

export const userEmailMessageMock = (user?: Partial<Staff>) =>
  ({
    id: encodeEntityId('123', 'Staff'),
    email: 'tari-c56aac53298fcc9c@toptal.io',
    fullName: 'Velia Wisozk',
    webResource: {
      url: 'http://demo-link.com',
      __typename: 'Link'
    },
    __typename: 'Staff',
    ...user
  } as unknown as Staff)
