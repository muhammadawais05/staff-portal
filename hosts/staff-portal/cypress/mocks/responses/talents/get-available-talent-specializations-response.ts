import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getAvailableTalentSpecializationsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      availableSpecializations: { nodes: [] },
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
