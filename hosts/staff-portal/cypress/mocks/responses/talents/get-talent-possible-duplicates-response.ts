import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentPossibleDuplicatesResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      unresolvedPossibleDuplicates: {
        nodes: [],
        __typename: 'TalentUnresolvedPossibleDuplicates'
      },
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
