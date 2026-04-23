import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentOnlineTestsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      onlineTestAttempts: {
        nodes: [],
        __typename: 'OnlineTestAttemptConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
