import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentEmailContactsResponse = (talent?: Partial<Talent>) => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        contacts: {
          nodes: [],
          __typename: 'ContactConnection'
        },
        ...talent,
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
