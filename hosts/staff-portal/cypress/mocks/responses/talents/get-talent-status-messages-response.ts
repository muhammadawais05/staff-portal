import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentStatusMessagesResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      statusMessages: {
        nodes: [],
        __typename: 'StatusMessageConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
