import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentTeamsWithEmailTrackingResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    viewer: {
      me: {
        id: encodeEntityId('123', 'Staff'),
        teams: {
          nodes: [],
          __typename: 'TeamConnection'
        },
        ...talent,
        __typename: 'Staff'
      },
      __typename: 'Viewer'
    }
  }
})
