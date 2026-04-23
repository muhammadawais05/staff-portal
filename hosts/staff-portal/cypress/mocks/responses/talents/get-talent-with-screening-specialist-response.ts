import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getTalentOperations } from '~integration/mocks/fragments'

export const getTalentWithScreeningSpecialistResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      currentSpecialistAssignment: null,
      operations: getTalentOperations(),
      ...talent,
      __typename: 'Talent'
    }
  }
})
