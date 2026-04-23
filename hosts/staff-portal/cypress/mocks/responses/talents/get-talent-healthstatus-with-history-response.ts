import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentHealthStatusWithHistoryResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      currentHealthStatus: talent?.currentHealthStatus ?? null,
      healthStatusHistory: {
        nodes: [],
        totalCount: 0,
        __typename: 'TalentHealthStatusConnection'
      },
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
